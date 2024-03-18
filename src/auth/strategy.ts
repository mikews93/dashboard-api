import jwt from "@elysiajs/jwt";
import { Elysia } from "elysia";

const { AUTH_SECRET = "", AUTH_DURATION } = Bun.env;

export const auth = new Elysia().use(
  jwt({
    name: "accessToken",
    secret: AUTH_SECRET,
    exp: AUTH_DURATION,
  })
);
