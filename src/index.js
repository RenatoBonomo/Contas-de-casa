export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/state" && request.method === "GET") {
      const raw = await env.PAINEL_KV.get("estado");
      const state = raw ? JSON.parse(raw) : null;
      return new Response(JSON.stringify({ state }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    if (url.pathname === "/api/state" && request.method === "POST") {
      const body = await request.json();
      await env.PAINEL_KV.put("estado", JSON.stringify(body.state));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
