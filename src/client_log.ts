export class ClientLog {
  state: DurableObjectState;

  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.env = env;
    this.sessions = [];
  }

  async fetch(request: Request) {
    const url = new URL(request.url);
    if (url.pathname == "/websocket") {
      if (request.headers.get("Upgrade") != "websocket") {
        return new Response("expected websocket", { status: 400 });
      }

      const pair = new WebSocketPair();
      await this.handleWebsocketSession(pair[1]);
      return new Response(null, { status: 101, webSocket: pair[0] });
    }

    if (url.pathname == "/" && request.method == "POST") {
      const requestJson = await request.json();
      const clientIp = request.headers.get("CF-Connecting-IP");
      const data = JSON.stringify({
        ip: clientIp,
        log: {
          timestamp: Date.now(),
          type: "request",
          method: requestJson.method,
          params: requestJson.params,
        },
      });

      this.sessions.forEach((session) => {
        session.webSocket.send(data);
      });
    }

    return new Response("Not found", { status: 404 });
  }

  async handleWebsocketSession(webSocket) {
    webSocket.accept();

    const session = { webSocket };
    this.sessions.push(session);

    let closeOrErrorHandler = (evt) => {
      this.sessions = this.sessions.filter((member) => member !== session);
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }
}

interface Env {}
