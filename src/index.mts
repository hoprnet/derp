export class ClientLog {
  constructor(controller, env) {
	}
}

export default {
  async fetch(request: Request, _environment: any, _context: any) {
    return await handleRequest(request);
  },
};

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  return new Response(
    `request method: ${request.method}, url: ${url.pathname}`
  );
}
