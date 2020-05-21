import { IBook } from "../types.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { goodResponse, notFoundResponse } from "../utils/responses.ts";

const endpoint = "/api/books";
const url = `http://localhost:4000${endpoint}`;
const param = "/:id";

let id: number = 1;

const newTestBook: Omit<IBook, "id"> = {
  title: "Test Book",
  year: 2019
};

const updateTestBook: Omit<IBook, "id"> = {
  title: "Updated Test Book",
  year: 2020
};

Deno.test(`route GET ${endpoint}`, async () => {
  const res = await fetch(url);

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse([]));
});

Deno.test(`route POST ${endpoint}`, async () => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTestBook)
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  id = data.data.id;
  assertEquals(data, goodResponse({ id, ...newTestBook }));
});

Deno.test(`route GET ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${id}`);

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse({ id, ...newTestBook }));
});

Deno.test(`route PUT ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateTestBook)
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse({ id, ...updateTestBook }));
});

Deno.test(`route DELETE ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${id}`, {
    method: "DELETE"
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse(true));
});

Deno.test("make sure book is deleted", async () => {
  const res = await fetch(`${url}/${id}`);

  assertEquals(res.ok, false);

  const data = await res.json();

  assertEquals(data, notFoundResponse("book"));
});
