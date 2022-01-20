import HTML from "./index.html";
import picHoprDerp from "./hopr_derp.gif";
import picHoprLink from "./hopr_rpc_linkability.gif";
import picHoprSetup1 from "./hopr_derp_setup_1.png";
import picHoprSetup2 from "./hopr_derp_setup_2.png";

const ethMainnetProvider = "https://eth-erigon.lsotech.net/";

const files = {
  "hopr_derp.gif": picHoprDerp,
  "hopr_rpc_linkability.gif": picHoprLink,
  "hopr_derp_setup_1.png": picHoprSetup1,
  "hopr_derp_setup_2.png": picHoprSetup2
}

const mimeTypes = {
  ".gif": "image/gif",
  ".png": "image/png"
}

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

  // serve static assets
  if (files[path[0]]) {
    const filename = path[0]
    const file = files[filename]
    const fileExt = filename.split('.')[1]
    const mimeType = mimeTypes[fileExt]
    return new Response(file, {
      headers: { "Content-Type": mimeType },
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
