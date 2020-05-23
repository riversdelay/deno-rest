import { Router } from "https://deno.land/x/denotrain@v0.4.4/mod.ts";
import { AuthorController } from "../controllers/AuthorController.ts";

const authorRouter = new Router();

authorRouter.get("/", AuthorController.getAll);
authorRouter.get("/:id", AuthorController.getSingle);
authorRouter.post("/", AuthorController.create);
authorRouter.put("/:id", AuthorController.edit);
authorRouter.delete("/:id", AuthorController.remove);

export { authorRouter };
