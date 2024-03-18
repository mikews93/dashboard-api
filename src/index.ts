import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { auth } from "auth/strategy";
import { api } from "controllers";

const { PORT } = Bun.env;

const app = new Elysia();
app.use(
  swagger({
    path: "/docs",
    theme: "deepSpace",
  })
);
app.get("/ping", () => "pong");
app.use(cors());

app.use(auth);
app.use(api);
app.listen(PORT || 3000);

console.log(`Server running at ${app.server?.hostname}:${app.server?.port}`);
