import { Hono } from "hono";
import type { Book } from "../types/book.js";

const exampleRoutes = new Hono();

// API Server prefix
const API_SERVER = "http://localhost:3000/api";

// SSR (Server Sice Rendering)
exampleRoutes.get("/ssr/books/", async (c) => {
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
      <link rel="stylesheet" href="/examples/css/style.css"/>
    </head>
    <body>
      <h3>책 목록</h3>
      <ul id="list">${booksHtml}</ul>
      <button id="more">더보기</button>
      <script type="module" src="/examples/js/list.js"></script>
    </body>
    </html>
  `);
});

export default exampleRoutes;
