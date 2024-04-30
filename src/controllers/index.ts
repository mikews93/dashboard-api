import { Elysia } from "elysia";
import { usersController } from "./users";
import { productsController } from "./products";
import { salesController } from "./sales";
import { videosController } from "./videos";
import { Glob } from "bun";

const glob = new Glob("/src/controllers/*.ts");
for await (const controller of glob.scan(".")) {
  if (controller.includes("index.ts")) {
    continue;
  }
  
}

export const api = new Elysia({ prefix: "api/v1" })
  .use(usersController)
  .use(productsController)
  .use(salesController)
  .use(videosController);
