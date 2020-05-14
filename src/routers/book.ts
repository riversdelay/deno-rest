import { Router } from "https://deno.land/x/denotrain@v0.4.0/mod.ts";
import { Book } from "../types.ts";

const books: Book[] = [
  {
    id: 1,
    title: "Harry Potter and the Philosopher's Stone",
    year: 1997
  },
  {
    id: 2,
    title: "Harry Potter and the Chamber of Secrets",
    year: 1998
  },
  {
    id: 3,
    title: "Harry Potter and the Prisoner of Azkaban",
    year: 1999
  }
];

const bookRouter = new Router();

bookRouter.get("/", ctx => {
  return books;
});

export { bookRouter };
