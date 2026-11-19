import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { Book } from "./types/book.js";
import { serveStatic } from "@hono/node-server/serve-static";

// API Server prefix
const API_SERVER = "http://localhost:3000/api";

const app = new Hono();

// static service
app.use("/*", serveStatic({ root: "./static" }));

// SSR (Server Sice Rendering)
app.get("/ssr/books/", async (c) => {
  const response = await fetch(`${API_SERVER}/books`);
  const books = await response.json();
  const booksHtml = books
    .map(
      (book: Book) =>
        `<li>${book.id}. ${book.title} / ${book.price.toLocaleString()}원</li>`,
    )
    .join("");

  return c.html(`
    <!doctype html>
    <html>
    <head>
      <link rel="stylesheet" href="/css/style.css"/>
    </head>
    <body>
      <h3>책 목록</h3>
      <ul id="list">${booksHtml}</ul>
      <button id="more">더보기</button>
      <script type="module" src="/js/list.js"></script>
    </body>
    </html>
  `);
});

serve({ fetch: app.fetch, port: 4000 }, (info) =>
  console.log(`Frontend Server started at ${info.port}`),
);
