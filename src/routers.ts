import { RouterData } from "./types.ts";
import { createRouter } from "./utils/createRouter.ts";
import { BookController } from "./controllers/BookController.ts";
import { AuthorController } from "./controllers/AuthorController.ts";

export const routers: RouterData[] = [
  {
    endpoint: "books",
    router: createRouter(BookController)
  },
  {
    endpoint: "authors",
    router: createRouter(AuthorController)
  }
];
