import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "./database/connection-pool.js";
import bookRoutes from "./routes/book-routes.js";
import { logger } from "hono/logger";
import { createOpenApiDocument } from "hono-zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { Scalar } from "@scalar/hono-api-reference";
import { serveStatic } from "@hono/node-server/serve-static";
import { staticOptions } from "./static-options.js";
import "./frontend-server.js";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", serveStatic(staticOptions));

app.use(cors({ origin: ["http://localhost:4000"] }));
app.use(logger());
app.route("/api/books", bookRoutes);

createOpenApiDocument(
  app,
  {
    info: {
      title: "Bookstore Open API",
      version: "1.0.0",
    },
  },
  { routeName: "/api/doc" },
);

// Render the OpenAPI document through Swagger UI
app.get("/api/swagger", swaggerUI({ url: "/api/doc" }));
app.get("/api/scalar", Scalar({ url: "/api/doc" }));
serve(app, (info) => console.log(`API Server started at ${info.port}`));
