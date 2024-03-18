import { products } from "db/models/products";
import { DefaultController } from "shared/utils/controllers";

export const productsController = new DefaultController("/products", products)
  .server;
