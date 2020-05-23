import { apiEndpoint, host, param } from "./shared.ts";
import { IAuthor, ID } from "../types.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { goodResponse, notFoundResponse } from "../utils/responses.ts";

const endpoint = `${apiEndpoint}/authors`;
const url = host + endpoint;

let id: ID = 1;

const newTestAuthor: Omit<IAuthor, "id"> = {
  name: "Test Author"
};

const updateTestAuthor: Omit<IAuthor, "id"> = {
  name: "Updated Test Author"
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
    body: JSON.stringify(newTestAuthor)
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  id = data.data.id;
  assertEquals(data, goodResponse({ id, ...newTestAuthor }));
});

Deno.test(`route GET ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${id}`);

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse({ id, ...newTestAuthor }));
});

Deno.test(`route PUT ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updateTestAuthor)
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse({ id, ...updateTestAuthor }));
});

Deno.test(`route DELETE ${endpoint}${param}`, async () => {
  const res = await fetch(`${url}/${id}`, {
    method: "DELETE"
  });

  assertEquals(res.ok, true);

  const data = await res.json();

  assertEquals(data, goodResponse(true));
});

Deno.test("make sure author is deleted", async () => {
  const res = await fetch(`${url}/${id}`);

  assertEquals(res.ok, false);

  const data = await res.json();

  assertEquals(data, notFoundResponse("author"));
});
