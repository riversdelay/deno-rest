import { IController } from "../types.ts";
import { Router } from "../dependencies.ts";

export const createRouter = (Controller: new () => IController): Router => {
  const router = new Router();
  const c = new Controller();

  router.get("/", c.getAll);
  router.get("/:id", c.getSingle);
  router.post("/", c.create);
  router.put("/:id", c.edit);
  router.delete("/:id", c.remove);

  return router;
};
