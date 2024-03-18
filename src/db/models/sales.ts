import { numeric, pgTable, serial, text } from "drizzle-orm/pg-core";

export const sales = pgTable("sales", {
  id: serial("id").primaryKey(),
  name: text("name"),
  price: numeric("price"),
});

export type Product = typeof sales.$inferSelect;
export type NewProduct = typeof sales.$inferInsert;
