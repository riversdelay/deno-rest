import { IController } from "../types.ts";
import { Router } from "../dependencies.ts";

export const createRouter = (Controller: IController): Router => {
  const router = new Router();

  router.get("/", Controller.getAll);
  router.get("/:id", Controller.getSingle);
  router.post("/", Controller.create);
  router.put("/:id", Controller.edit);
  router.delete("/:id", Controller.remove);

  return router;
};
