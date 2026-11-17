// Minimal stand-in for api.stripe.com used by the e2e tests. Records every request.
import http from "node:http";
import fs from "node:fs";
const LOG = process.env.MOCK_LOG;
http.createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    fs.appendFileSync(LOG, JSON.stringify({ method: req.method, url: req.url, body, auth: req.headers.authorization }) + "\n");
    res.setHeader("content-type", "application/json");
    if (req.method === "POST" && req.url === "/v1/checkout/sessions") {
      const p = new URLSearchParams(body);
      const success = p.get("success_url").replace("{CHECKOUT_SESSION_ID}", "cs_test_mock123");
      return res.end(JSON.stringify({ id: "cs_test_mock123", object: "checkout.session", url: success }));
    }
    if (req.method === "GET" && req.url.startsWith("/v1/checkout/sessions/cs_test_mock123/line_items")) {
      return res.end(JSON.stringify({ object: "list", has_more: false, data: [{ id: "li_1", quantity: 2, description: "Sifnos Dining Chair", amount_total: 39000 }] }));
    }
    if (req.method === "GET" && req.url.startsWith("/v1/checkout/sessions/cs_test_mock123")) {
      return res.end(JSON.stringify({
        id: "cs_test_mock123", object: "checkout.session", payment_status: "paid", amount_total: 41900,
        customer_details: { email: "buyer@example.com" }, shipping_cost: { amount_total: 0 },
        line_items: { object: "list", data: [{ id: "li_1", quantity: 2, description: "Sifnos Dining Chair", amount_total: 39000 }] },
      }));
    }
    res.statusCode = 404; res.end(JSON.stringify({ error: { message: "not mocked" } }));
  });
}).listen(Number(process.env.MOCK_PORT || 12111));
