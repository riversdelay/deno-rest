import { Router } from "../dependencies.ts";
import { IController } from "../types.ts";

export class MyRouter extends Router {
  constructor(Controller: new () => IController) {
    super();

    const c = new Controller();

    this.get("/", c.getAll);
    this.get("/:id", c.getSingle);
    this.post("/", c.create);
    this.put("/:id", c.edit);
    this.delete("/:id", c.remove);
  }
}
