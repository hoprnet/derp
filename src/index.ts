import HTML from "./index.html";

const ethMainnetProvider = "https://eth-erigon.lsotech.net/";

export async function handleRequest(
  request: Request,
  env: Env
): Promise<Response> {
  const url = new URL(request.url);
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

  if (url.pathname == "/" && /text\/html/.test(acceptContent)) {
    return new Response(HTML, {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }

  if (path[0] == "client_logs") {
    newUrl.pathname = "/" + path.slice(1).join("/");
    return logsObject.fetch(newUrl, request);
  }

  return new Response("Not found", { status: 404 });
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
