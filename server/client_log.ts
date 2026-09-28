export class ClientLogV2 implements DurableObject {
  state: DurableObjectState;
  env: Env;
  sessions: Set<WebSocket> = new Set();

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request: Request) {
    const url = new URL(request.url);

    if (url.pathname == "/websocket") {
      if (request.headers.get("Upgrade") != "websocket") {
        return new Response("expected websocket", { status: 400 });
      }

      const [client, server] = Object.values(new WebSocketPair());
      server.accept();
      this.sessions.add(server);
      const remove = () => this.sessions.delete(server);
      server.addEventListener("close", remove);
      server.addEventListener("error", remove);

      return new Response(null, { status: 101, webSocket: client });
    }

    if (url.pathname == "/" && request.method == "POST") {
      let json: any;
      try {
        json = await request.json();
      } catch (error) {
        console.log("Cannot read JSON body:", error);
        return new Response("Bad request", { status: 400 });
      }

      const data = JSON.stringify({
        ip: request.headers.get("CF-Connecting-IP"),
        country: request.headers.get("CF-IPCountry"),
        cf: {
          ...request.cf,
          originalUrl: request.headers.get("X-DERP-Original-Url"),
        },
        log: {
          timestamp: new Date().toJSON(),
          userAgent: request.headers.get("User-Agent"),
          type: "request",
          method: json?.method,
          params: json?.params,
        },
      });

      for (const ws of this.sessions) {
        try {
          ws.send(data);
        } catch {
          this.sessions.delete(ws);
        }
      }
      return new Response(null, { status: 204 });
    }

    return new Response("Not found", { status: 404 });
  }
}
