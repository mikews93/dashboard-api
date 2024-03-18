import type { Config } from "drizzle-kit";
import { DATABASE_URL } from "shared/constants";

export default {
  schema: "./src/db/models/*",
  out: "./src/db/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: DATABASE_URL,
  },
} satisfies Config;
