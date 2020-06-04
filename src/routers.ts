import { RouterData } from "./types.ts";
import { MyRouter } from "./utils/MyRouter.ts";
import { BookController } from "./controllers/BookController.ts";
import { AuthorController } from "./controllers/AuthorController.ts";

export const routers: RouterData[] = [
  {
    endpoint: "books",
    router: new MyRouter(BookController)
  },
  {
    endpoint: "authors",
    router: new MyRouter(AuthorController)
  }
];
