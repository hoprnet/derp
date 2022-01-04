
import HTML from "./index.html"

export { ClientLog } from './client_log'

const provider = "https://eth-erigon.lsotech.net/"

export default {
  async fetch(request: Request, env: Env) {
    try {
      return await handleRequest(request, env)
    } catch (e) {
      return new Response(`${e}`)
    }
  },
}

async function handleRequest(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const acceptContent = request.headers.get("accept-content")
  const contentType = request.headers.get("content-type")
  const method = request.method

  if (url.pathname == "/") {
    if (acceptContent == "text/html") {
      return new Response(HTML, {headers: {"Content-Type": "text/html;charset=UTF-8"}})
    }
    if (contentType == "application/json" && method == "POST") {
      return fetchFromProvider(request)
    }
  }

  return new Response("Not found", {status: 404})
}

async function fetchFromProvider(request: Request) {
  return fetch(provider, request).then(async function (response) {
    return response
  })
}

interface Env {
  CLIENT_LOG: DurableObjectNamespace
}
