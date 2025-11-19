import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
import { chains } from "../src/shared/chains.js";

const assetManifest = JSON.parse(manifestJSON);

/**
 * Hash client identifier using SHA-256
 * Provides privacy by not exposing raw IP addresses as Durable Object names
 */
async function hashClientId(ip: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

/**
 * SSRF Protection: Allowlist of valid provider origins
 */
const ALLOWED_PROVIDER_ORIGINS = new Set(
  chains.map((c) => {
    try {
      return new URL(c.originalUrl).origin;
    } catch {
      return "";
    }
  }).filter((origin) => origin !== "")
);

/** RPC request timeout (30 seconds) */
const RPC_TIMEOUT = 30000;

/**
 * Validate provider URL against allowlist
 * Prevents SSRF attacks by ensuring only configured RPC providers are accessed
 */
function validateProviderUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ALLOWED_PROVIDER_ORIGINS.has(urlObj.origin);
  } catch {
    return false;
  }
}

/**
 * Add security headers to response
 * Implements defense-in-depth security practices
 */
function addSecurityHeaders(response: Response): Response {
  const newHeaders = new Headers(response.headers);

  // Prevent MIME type sniffing
  newHeaders.set("X-Content-Type-Options", "nosniff");

  // Prevent clickjacking
  newHeaders.set("X-Frame-Options", "DENY");

  // Enable XSS protection (legacy, but still useful for older browsers)
  newHeaders.set("X-XSS-Protection", "1; mode=block");

  // Control referrer information
  newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Restrict permissions
  newHeaders.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=(), payment=()"
  );

  // HTTP Strict Transport Security (HSTS)
  // Only set for HTTPS responses
  const url = response.url || "";
  if (url.startsWith("https://")) {
    newHeaders.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders,
    webSocket: response.webSocket,
  });
}

export async function handleRequest(
  request: Request,
  env: Env,
  ctx: Context,
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
      return addSecurityHeaders(
        new Response("Unsupported protocol", { status: 422 })
      );
    }
  }

  const acceptContent = request.headers.get("accept");
  const contentType = request.headers.get("content-type");
  const method = request.method;
  const path = url.pathname.slice(1).split("/");
  const clientIp = request.headers.get("CF-Connecting-IP") || "unknown";
  // Hash client IP for privacy - don't expose raw IPs as DO names
  const hashedId = await hashClientId(clientIp, env.ID_SALT || "default-salt-change-in-production");
  const clientLogsId = env.client_logs_v2.idFromName(hashedId);
  const logsObject = env.client_logs_v2.get(clientLogsId);
  let newUrl = new URL(request.url);

  const chosenChain =
    chains.filter((chain) => url.pathname.includes(chain.derpUrl))[0];

  if (chosenChain) {
    newUrl.pathname = "/";
    let object = request.clone();
    (object as any).cf.originalUrl = object.url;
    await logsObject.fetch(newUrl, object);
    const providerResponse = await fetchFromProvider(
      chosenChain.originalUrl,
      request
    );
    return addSecurityHeaders(providerResponse);
  }

  // Handle Durable Object requests (WebSocket and logging) before static assets
  if (path[0] == "client_logs") {
    const doPath = "/" + path.slice(1).join("/");
    console.log("[DERP] Forwarding to Durable Object:", {
      originalPath: url.pathname,
      newPath: doPath,
      method: request.method,
      upgrade: request.headers.get("Upgrade"),
      connection: request.headers.get("Connection"),
    });

    try {
      console.log("[DERP] Calling Durable Object fetch with path:", doPath);
      const response = await logsObject.fetch(`http://stub${doPath}`, request);
      console.log("[DERP] Durable Object response received:", {
        status: response.status,
        statusText: response.statusText,
        hasWebSocket: !!response.webSocket,
      });

      // Don't add security headers to WebSocket upgrade responses
      if (response.webSocket) {
        return response;
      }
      return addSecurityHeaders(response);
    } catch (error) {
      console.error("[DERP] Error forwarding to Durable Object:", error);
      return addSecurityHeaders(
        new Response("Internal Server Error", { status: 500 })
      );
    }
  }

  // Serve static assets
  try {
    const assetResponse = await getAssetFromKV(
      {
        request,
        waitUntil(promise) {
          return ctx.waitUntil(promise);
        },
      },
      {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
      },
    );
    return addSecurityHeaders(assetResponse);
  } catch (e) {
    return addSecurityHeaders(
      new Response("Not found", { status: 404 })
    );
  }
}

/**
 * Fetch from RPC provider with SSRF protection and timeout
 * @param provider - The RPC provider URL
 * @param request - The original request to forward
 * @returns Response from the RPC provider
 */
async function fetchFromProvider(
  provider: string,
  request: Request
): Promise<Response> {
  // SSRF Protection: Validate provider URL is in allowlist
  if (!validateProviderUrl(provider)) {
    console.error("[DERP] SSRF attempt blocked - Invalid provider URL:", provider);
    return new Response("Forbidden: Invalid provider URL", { status: 403 });
  }

  // Create abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), RPC_TIMEOUT);

  try {
    const response = await fetch(provider, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      signal: controller.signal,
    });
    return response;
  } catch (error: any) {
    // Handle timeout
    if (error.name === "AbortError") {
      console.error("[DERP] RPC request timeout:", provider);
      return new Response("Gateway Timeout", { status: 504 });
    }
    // Handle other errors
    console.error("[DERP] RPC request failed:", error.message);
    return new Response("Bad Gateway", { status: 502 });
  } finally {
    clearTimeout(timeoutId);
  }
}

const worker: ExportedHandler<Bindings> = { fetch: handleRequest };

// Make sure we export the Durable Object class
export { ClientLogV2 } from "./client_log";
export default worker;
