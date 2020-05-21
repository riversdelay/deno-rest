import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { IResponse, IBook } from "../types.ts";
import { notFoundResponse } from "../utils/responses.ts";

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

  const { ok, errors, data } = (await res.json()) as IResponse<IBook[]>;

  assertEquals(ok, true);
  assertEquals(errors, null);
  assertEquals(data, []);
});

Deno.test(`route POST ${endpoint}`, async () => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTestBook)
  });

  assertEquals(res.ok, true);

  const { ok, errors, data } = (await res.json()) as IResponse<IBook>;

  assertEquals(ok, true);
  assertEquals(errors, null);
  id = data!.id;
  assertEquals(data, { id, ...newTestBook });
});

Deno.test(`route GET ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${id}`);

  assertEquals(res.ok, true);

  const { ok, errors, data } = (await res.json()) as IResponse<IBook>;

  assertEquals(ok, true);
  assertEquals(errors, null);
  assertEquals(data, { id, ...newTestBook });
});

Deno.test(`route PUT ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateTestBook)
  });

  assertEquals(res.ok, true);

  const { ok, errors, data } = (await res.json()) as IResponse<IBook>;

  assertEquals(ok, true);
  assertEquals(errors, null);
  assertEquals(data, { id, ...updateTestBook });
});

Deno.test(`route DELETE ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${id}`, {
    method: "DELETE"
  });

  assertEquals(res.ok, true);

  const { ok, errors, data } = (await res.json()) as IResponse<boolean>;

  assertEquals(ok, true);
  assertEquals(errors, null);
  assertEquals(data, true);
});

Deno.test("make sure book is deleted", async () => {
  const res = await fetch(`${url}/${id}`);

  assertEquals(res.ok, false);

  const { ok, errors, data } = (await res.json()) as IResponse<IBook>;

  assertEquals(ok, false);
  assertEquals(errors, notFoundResponse("book"));
  assertEquals(data, null);
});
