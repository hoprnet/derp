import HTML from "./index.html";

const ethMainnetProvider = "https://eth-erigon.lsotech.net/";
const xdaiMainnetProvider = "https://provider-proxy.hoprnet.workers.dev/xdai_mainnet";

export async function handleRequest(
  request: Request,
  env: Env
): Promise<Response> {
  const url = new URL(request.url);
  const acceptContent = request.headers.get("accept");
  const contentType = request.headers.get("content-type");
  const method = request.method;

  if (url.pathname == "/" && /text\/html/.test(acceptContent)) {
    return new Response(HTML, {
      headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
  }

  console.log(request.headers)
  if (url.pathname == "/rpc/eth/mainnet") {
    return fetchFromProvider(ethMainnetProvider, request);
  }
  if (url.pathname == "/rpc/xdai/mainnet") {
    return fetchFromProvider(xdaiMainnetProvider, request);
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
