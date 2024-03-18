import { Elysia } from "elysia";
import { usersController } from "./users";
import { productsController } from "./products";
import { salesController } from "./sales";

export const api = new Elysia({ prefix: "api/v1" })
  .use(usersController)
  .use(productsController)
  .use(salesController);
