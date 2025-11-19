import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
import { chains } from "../src/shared/chains.js";

const assetManifest = JSON.parse(manifestJSON);

export async function handleRequest(
  request: Request,
  env: Env,
  ctx: Context
): Promise<Response> {
  const url = new URL(request.url);

  // redirect to secure connections, unless on localhost (for testing)
  if (url.hostname != "localhost" && url.hostname != "127.0.0.1") {
    if (url.protocol == "http:" || url.protocol == "ws:") {
      const { pathname, search, host } = url;
      const secureProtocol = url.protocol
        .replace("http", "https")
        .replace("ws", "wss");
      const secureUrl = `${secureProtocol}//${host}${pathname}${search}`;
      return Response.redirect(secureUrl, 307);
    }

    // only pass when we are on secure connections
    if (url.protocol != "https:" && url.protocol != "wss:") {
      return new Response("Unsupported protocol", { status: 422 });
    }
  }

  const acceptContent = request.headers.get("accept");
  const contentType = request.headers.get("content-type");
  const method = request.method;
  const path = url.pathname.slice(1).split("/");
  const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
  const clientLogsId = env.client_logs_v2.idFromName(clientIp);
  const logsObject = env.client_logs_v2.get(clientLogsId);
  let newUrl = new URL(request.url);

  const chosenChain = chains.filter((chain) =>
    url.pathname.includes(chain.derpUrl)
  )[0];

  if (chosenChain) {
    newUrl.pathname = "/";
    let object = request.clone();
    (object as any).cf.originalUrl = object.url;
    await logsObject.fetch(newUrl, object);
    return fetchFromProvider(chosenChain.originalUrl, request);
  }

  // Handle Durable Object requests (WebSocket and logging) before static assets
  if (path[0] == "client_logs") {
    newUrl.pathname = "/" + path.slice(1).join("/");
    console.log("[DERP] Forwarding to Durable Object:", {
      originalPath: url.pathname,
      newPath: newUrl.pathname,
      method: request.method,
      upgrade: request.headers.get("Upgrade"),
      connection: request.headers.get("Connection"),
    });

    try {
      const response = await logsObject.fetch(newUrl, request);
      console.log("[DERP] Durable Object response:", {
        status: response.status,
        statusText: response.statusText,
        hasWebSocket: !!response.webSocket,
      });
      
      if (response.webSocket) {
        return new Response(null, {
          status: 101,
          statusText: 'Switching Protocols',
          webSocket: response.webSocket,
        });
      }
      
      return response;
    } catch (error) {
      console.error("[DERP] Error forwarding to Durable Object:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  }

  // Serve static assets
  try {
    return await getAssetFromKV(
      {
        request,
        waitUntil(promise) {
          return ctx.waitUntil(promise);
        },
      },
      {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
      }
    );
  } catch (e) {
    return new Response("Not found", { status: 404 });
  }
}

async function fetchFromProvider(provider: string, request: Request) {
  return fetch(provider, request).then(async function (response) {
    return response;
  });
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

// Make sure we export the Durable Object class
export { ClientLogV2 } from "./client_log";
export default worker;
