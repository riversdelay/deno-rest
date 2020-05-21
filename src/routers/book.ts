import { Router } from "https://deno.land/x/denotrain@v0.4.4/mod.ts";
import { BookController } from "../controllers/BookController.ts";

const bookRouter = new Router();

bookRouter.get("/", BookController.getAll);
bookRouter.get("/:id", BookController.getSingle);
bookRouter.post("/", BookController.create);
bookRouter.put("/:id", BookController.edit);
bookRouter.delete("/:id", BookController.remove);

export { bookRouter };
