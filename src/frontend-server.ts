import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { serveStatic } from "@hono/node-server/serve-static";
import { staticOptions } from "./static-options.js";
import exampleRoutes from "./routes/example-routes.js";
import { proxy } from "hono/proxy";

const app = new Hono();

// example csr
app.use("/examples/*", serveStatic({ root: "./static" }));

// example ssr
app.route("/examples", exampleRoutes);

// bookstore frontend
app.all("/api/*", (c) => {
  // api proxy
  const target = new URL(c.req.url);
  target.protocol = "http:";
  target.hostname = "localhost";
  target.port = "3000";

  return proxy(target, {
    raw: c.req.raw,
  });
});

app.use("/*", serveStatic(staticOptions));

serve({ fetch: app.fetch, port: 4000 }, (info) =>
  console.log(`Frontend Server started at ${info.port}`),
);
