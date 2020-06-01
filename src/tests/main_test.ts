import { authorEndpoint, bookEndpoint } from "../utils/constants.ts";
import { ID, IAuthor, IBook } from "../types.ts";
import { assertEquals } from "https://deno.land/std@v0.54.0/testing/asserts.ts";
import { goodResponse, notFoundResponse } from "../utils/responses.ts";

const host = "http://localhost:4000";
const authorUrl = host + authorEndpoint;
const bookUrl = host + bookEndpoint;

let authorId: ID, bookId: ID;

const newTestAuthor: Omit<IAuthor, "id"> = {
  name: "Test Author"
};

const updateTestAuthor: Omit<IAuthor, "id"> = {
  name: "Updated Test Author"
};

const newTestBook: Omit<IBook, "id" | "authorId"> = {
  title: "Test Book",
  year: 2019,
  pages: 100,
  genre: "Fantasy",
  language: "English",
  edition: "First edition",
  isbn: "1234567890"
};

const updateTestBook: Omit<IBook, "id" | "authorId"> = {
  title: "Updated Test Book",
  year: 2020,
  pages: 200,
  genre: "Science fiction",
  language: "Portuguese",
  edition: "Second edition",
  isbn: "0987654321234"
};

Deno.test("get all authors", async () => {
  const res = await fetch(authorUrl);

  assertEquals(res.status, 200);

  const data = await res.json();

  assertEquals(data, goodResponse([]));
});

Deno.test("get all books", async () => {
  const res = await fetch(bookUrl);

  assertEquals(res.status, 200);

  const data = await res.json();

  assertEquals(data, goodResponse([]));
});

Deno.test("create an author", async () => {
  const res = await fetch(authorUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTestAuthor)
  });

  assertEquals(res.status, 201);

  const data = await res.json();

  authorId = data.data.id;
  assertEquals(data, goodResponse({ id: authorId, ...newTestAuthor }));
});

Deno.test("create a book", async () => {
  const res = await fetch(bookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ authorId, ...newTestBook })
  });

  assertEquals(res.status, 201);

  const data = await res.json();

  bookId = data.data.id;
  assertEquals(data, goodResponse({ id: bookId, authorId, ...newTestBook }));
});

Deno.test("get a single author", async () => {
  const res = await fetch(`${authorUrl}/${authorId}`);

  assertEquals(res.status, 200);

  const data = await res.json();

  assertEquals(data, goodResponse({ id: authorId, ...newTestAuthor }));
});

Deno.test("get a single book", async () => {
  const res = await fetch(`${bookUrl}/${bookId}`);

  assertEquals(res.status, 200);

  const data = await res.json();

  assertEquals(data, goodResponse({ id: bookId, authorId, ...newTestBook }));
});

Deno.test("update an author", async () => {
  const res = await fetch(`${authorUrl}/${authorId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateTestAuthor)
  });

  assertEquals(res.status, 200);

  const data = await res.json();

  assertEquals(data, goodResponse({ id: authorId, ...updateTestAuthor }));
});

Deno.test("update a book", async () => {
  const res = await fetch(`${bookUrl}/${bookId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateTestBook)
  });

  assertEquals(res.status, 200);

  const data = await res.json();

  assertEquals(data, goodResponse({ id: bookId, authorId, ...updateTestBook }));
});

Deno.test("delete a book", async () => {
  const res = await fetch(`${bookUrl}/${bookId}`, {
    method: "DELETE"
  });

  assertEquals(res.status, 200);

  const data = await res.json();

  assertEquals(data, goodResponse(true));
});

Deno.test("make sure book is deleted", async () => {
  const res = await fetch(`${bookUrl}/${bookId}`);

  assertEquals(res.status, 400);

  const data = await res.json();

  assertEquals(data, notFoundResponse("book"));
});

Deno.test("delete an author", async () => {
  const res = await fetch(`${authorUrl}/${authorId}`, {
    method: "DELETE"
  });

  assertEquals(res.status, 200);

  const data = await res.json();

  assertEquals(data, goodResponse(true));
});

Deno.test("make sure author is deleted", async () => {
  const res = await fetch(`${authorUrl}/${authorId}`);

  assertEquals(res.status, 400);

  const data = await res.json();

  assertEquals(data, notFoundResponse("author"));
});
