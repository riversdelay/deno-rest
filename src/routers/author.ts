import { Router } from "../dependencies.ts";
import { AuthorController } from "../controllers/AuthorController.ts";

// @for /api/authors
const authorRouter = new Router();

authorRouter.get("/", AuthorController.getAll);
authorRouter.get("/:id", AuthorController.getSingle);
authorRouter.post("/", AuthorController.create);
authorRouter.put("/:id", AuthorController.edit);
authorRouter.delete("/:id", AuthorController.remove);

export { authorRouter };
