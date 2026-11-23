const API_SERVER = "http://localhost:3000/api";
const listElement = document.querySelector("#list");
let page = 0;

// 초기 목록
fetchBooks();

// 더보기 버튼 이벤트
document.querySelector("#more").addEventListener("click", fetchBooks);

export async function fetchBooks() {
  const response = await fetch(`${API_SERVER}/books?page=${++page}`);
  const books = await response.json();
  const booksHtml = books
    .map(
      (book) =>
        `<li>${book.id}. ${book.title} / ${book.price.toLocaleString()}원</li>`,
    )
    .join("");
  listElement.insertAdjacentHTML("beforeend", booksHtml);
}
