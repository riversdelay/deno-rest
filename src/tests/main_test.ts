import { apiEndpoint, host } from "./constants.ts";
import { ID, IAuthor, IBook } from "../types.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { goodResponse, notFoundResponse } from "../utils/responses.ts";

const authorEndpoint = `${host}${apiEndpoint}/authors`;
const bookEndpoint = `${host}${apiEndpoint}/books`;

let authorId: ID;
let bookId: ID;

const newTestAuthor: Omit<IAuthor, "id"> = {
  name: "Test Author"
};

const updateTestAuthor: Omit<IAuthor, "id"> = {
  name: "Updated Test Author"
};

const num = Math.pow(10, 12);
const getISBN = () => Math.floor(num + Math.random() * (num * 9));

const newTestBook: Omit<IBook, "id"> = {
  title: "Test Book",
  year: 2019,
  pages: 100,
  genre: "Fantasy",
  language: "English",
  edition: "First edition",
  isbn: getISBN()
};

const updateTestBook: Omit<IBook, "id"> = {
  title: "Updated Test Book",
  year: 2020,
  pages: 200,
  genre: "Science fiction",
  language: "Spanish",
  edition: "Second edition",
  isbn: getISBN()
};

Deno.test("get all authors", async () => {
  const res = await fetch(authorEndpoint);

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse([]));
});

Deno.test("get all books", async () => {
  const res = await fetch(bookEndpoint);

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse([]));
});

Deno.test("create an author", async () => {
  const res = await fetch(authorEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTestAuthor)
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  authorId = data.data.id;
  assertEquals(data, goodResponse({ id: authorId, ...newTestAuthor }));
});

Deno.test("create a book", async () => {
  const res = await fetch(bookEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authorId, ...newTestBook })
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  bookId = data.data.id;
  assertEquals(data, goodResponse({ id: bookId, authorId, ...newTestBook }));
});

Deno.test("get a single author", async () => {
  const res = await fetch(`${authorEndpoint}/${authorId}`);

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse({ id: authorId, ...newTestAuthor }));
});

Deno.test("get a single book", async () => {
  const res = await fetch(`${bookEndpoint}/${bookId}`);

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse({ id: bookId, authorId, ...newTestBook }));
});

Deno.test("update an author", async () => {
  const res = await fetch(`${authorEndpoint}/${authorId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateTestAuthor)
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse({ id: authorId, ...updateTestAuthor }));
});

Deno.test("update a book", async () => {
  const res = await fetch(`${bookEndpoint}/${bookId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateTestBook)
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse({ id: bookId, authorId, ...updateTestBook }));
});

Deno.test("delete a book", async () => {
  const res = await fetch(`${bookEndpoint}/${bookId}`, {
    method: "DELETE"
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse(true));
});

Deno.test("make sure book is deleted", async () => {
  const res = await fetch(`${bookEndpoint}/${bookId}`);

  assertEquals(res.ok, false);

  const data = await res.json();

  assertEquals(data, notFoundResponse("book"));
});

Deno.test("delete an author", async () => {
  const res = await fetch(`${authorEndpoint}/${authorId}`, {
    method: "DELETE"
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse(true));
});

Deno.test("make sure author is deleted", async () => {
  const res = await fetch(`${authorEndpoint}/${authorId}`);

  assertEquals(res.ok, false);

  const data = await res.json();

  assertEquals(data, notFoundResponse("author"));
});
