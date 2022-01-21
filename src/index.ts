import { getAssetFromKV } from "@cloudflare/kv-asset-handler";

import manifestJSON from "__STATIC_CONTENT_MANIFEST";
const assetManifest = JSON.parse(manifestJSON);

const ethMainnetProvider = "https://eth-erigon.lsotech.net/";

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
  const clientIp = request.headers.get("CF-Connecting-IP");
  const clientLogsId = env.client_logs.idFromName(clientIp);
  const logsObject = env.client_logs.get(clientLogsId);
  let newUrl = new URL(request.url);

  if (url.pathname == "/rpc/eth/mainnet") {
    newUrl.pathname = "/";
    await logsObject.fetch(newUrl, request.clone());
    return fetchFromProvider(ethMainnetProvider, request);
  }

  // before proceeding to try to setup the websocket, we try to serve static
  // assets
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
    if (path[0] == "client_logs") {
      newUrl.pathname = "/" + path.slice(1).join("/");
      return logsObject.fetch(newUrl, request);
    }
    return new Response("Not found", { status: 404 });
  }
}

async function fetchFromProvider(provider: String, request: Request) {
  return fetch(provider, request).then(async function (response) {
    return response;
  });
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

// Make sure we export the Counter Durable Object class
export { ClientLog } from "./client_log";
export default worker;
