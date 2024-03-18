import db from "db";
import { sql } from "drizzle-orm";
import { PgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-typebox";
import { Elysia, t } from "elysia";

export class DefaultController {
  private _server;
  private _model;
  private _insertSchema;

  constructor(prefix: string, model: PgTable, initRoutes: boolean = true) {
    // @ts-expect-error
    this._insertSchema = t.Object({ ...createInsertSchema(model).properties });
    this._server = new Elysia({ prefix });
    this._model = model;

    if (initRoutes) {
      this.initDefaultRoutes();
    }
  }

  create = () => {
    return this._server.post(
      "",
      ({ body: data }) => {
        return db.insert(this._model).values(data);
      },
      { body: this._insertSchema }
    );
  };

  findAll = () => {
    return this._server.get("", () => db.select().from(this._model));
  };

  findById = () => {
    return this._server.get(
      "/:id",
      ({ params: { id } }) => {
        return (
          db
            .select()
            .from(this._model)
            // @ts-expect-error
            .where(sql`${this._model.id}=${id}`)
            .limit(1)
        );
      },
      {
        params: t.Object({
          id: t.Numeric(),
        }),
      }
    );
  };

  updateById = () => {
    return this._server.patch(
      "/:id",
      ({ body: data, params: { id } }) =>
        db
          .update(this._model)
          .set(data)
          // @ts-expect-error
          .where(sql`${this._model.id}=${id}`)
          .returning(),
      {
        body: this._insertSchema,
        params: t.Object({
          id: t.Numeric(),
        }),
      }
    );
  };

  deleteById = () => {
    return this._server.delete(
      "/:id",
      ({ params: { id } }) => {
        // @ts-expect-error
        return db.delete(this._model).where(sql`${this._model.id}=${id}`);
      },
      {
        params: t.Object({
          id: t.Numeric(),
        }),
      }
    );
  };

  initDefaultRoutes = () => {
    this.create();
    this.findAll();
    this.findById();
    this.updateById();
    this.deleteById();
  };

  get server() {
    return this._server;
  }
}
