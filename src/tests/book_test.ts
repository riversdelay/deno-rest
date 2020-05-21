import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { IResponse, IBook } from "../types.ts";

const endpoint = "/api/books";
const url = `http://localhost:4000${endpoint}`;
const param = "/:id";

// need to send denotrain cookie otherwise requests with body will fail
let cookie: string | null = null;

const newTestBook: IBook = {
  id: 1,
  title: "Test Book",
  year: 2019
};

const updateTestBook: IBook = {
  id: newTestBook.id,
  title: "Updated Test Book",
  year: 2020
};

Deno.test(`route GET ${endpoint}`, async () => {
  const res = await fetch(url);
  cookie = res.headers.get("set-cookie");

  assertEquals(res.ok, true);

  const { ok, errors, data } = (await res.json()) as IResponse<IBook>;

  assertEquals(ok, true);
  assertEquals(errors, null);
  assertEquals(data, []);
});

Deno.test(`route POST ${endpoint}`, async () => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      cookie: cookie || ""
    },
    body: JSON.stringify(newTestBook)
  });

  assertEquals(res.ok, true);

  const { ok, errors, data } = (await res.json()) as IResponse<IBook>;

  assertEquals(ok, true);
  assertEquals(errors, null);
  assertEquals(data, newTestBook);
});

Deno.test(`route GET ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${newTestBook.id}`);

  assertEquals(res.ok, true);

  const { ok, errors, data } = (await res.json()) as IResponse<IBook>;

  assertEquals(ok, true);
  assertEquals(errors, null);
  assertEquals(data, newTestBook);
});

Deno.test(`route PUT ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${updateTestBook.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      cookie: cookie || ""
    },
    body: JSON.stringify(updateTestBook)
  });

  assertEquals(res.ok, true);

  const { ok, errors, data } = (await res.json()) as IResponse<IBook>;

  assertEquals(ok, true);
  assertEquals(errors, null);
  assertEquals(data, updateTestBook);
});

Deno.test(`route DELETE ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${newTestBook.id}`, {
    method: "DELETE"
  });

  assertEquals(res.ok, true);

  const { ok, errors, data } = (await res.json()) as IResponse<IBook>;

  assertEquals(ok, true);
  assertEquals(errors, null);
  assertEquals(data, true);
});

Deno.test("make sure book is deleted", async () => {
  const res = await fetch(`${url}/${newTestBook.id}`);

  assertEquals(res.ok, false);

  const { ok, errors, data } = (await res.json()) as IResponse<IBook>;

  assertEquals(ok, false);
  assertEquals(errors, [
    {
      path: "id",
      message: "Could not find book by given ID"
    }
  ]);
  assertEquals(data, null);
});
