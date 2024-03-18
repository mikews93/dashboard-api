import { numeric, pgTable, serial, text } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name"),
  price: numeric("price"),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
