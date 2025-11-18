export class ClientLog implements DurableObject {
  state: DurableObjectState;
  env: Env;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request) {
    const url = new URL(request.url);
    console.log("[ClientLog] Received request:", {
      pathname: url.pathname,
      method: request.method,
      upgrade: request.headers.get("Upgrade"),
      connection: request.headers.get("Connection"),
    });

    if (url.pathname == "/websocket") {
      if (request.headers.get("Upgrade") != "websocket") {
        console.log("[ClientLog] Rejecting non-WebSocket upgrade request");
        return new Response("expected websocket", { status: 400 });
      }

      console.log("[ClientLog] Creating WebSocket pair");
      const pair = new WebSocketPair();
      const [client, server] = Object.values(pair);

      // Use Hibernation API instead of webSocket.accept()
      console.log("[ClientLog] Accepting WebSocket with Hibernation API");
      this.state.acceptWebSocket(server);

      console.log("[ClientLog] Returning 101 Switching Protocols");
      return new Response(null, { status: 101, webSocket: client });
    }

    if (url.pathname == "/" && request.method == "POST") {
      request
        .json()
        .then((json: any) => {
          const data = JSON.stringify({
            ip: request.headers.get("CF-Connecting-IP"),
            country: request.headers.get("CF-IPCountry"),
            cf: (request as any).cf,
            log: {
              timestamp: new Date().toJSON(),
              userAgent: request.headers.get("User-Agent"),
              type: "request",
              method: json.method,
              params: json.params,
            },
          });

          // Broadcast to all connected WebSockets using Hibernation API
          this.state.getWebSockets().forEach((ws) => {
            ws.send(data);
          });
        })
        .catch((error) => {
          console.log("Cannot read JSON body:", error);
        });
    }

    return new Response("Not found", { status: 404 });
  }

  // Hibernation API handler - called when a WebSocket connection closes
  async webSocketClose(
    ws: WebSocket,
    code: number,
    reason: string,
    wasClean: boolean
  ) {
    // Connection cleanup is handled automatically by the Hibernation API
    ws.close(code, "Durable Object is closing WebSocket");
  }
}

interface Env {}
