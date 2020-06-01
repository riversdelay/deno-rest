import "https://deno.land/x/dotenv@v0.4.1/load.ts";
import { Client } from "../dependencies.ts";
import { isTesting } from "../utils/isTesting.ts";

const env = Deno.env.toObject();

export const client = new Client({
  user: env.POSTGRES_USER,
  hostname: env.POSTGRES_HOST,
  password: env.POSTGRES_PASSWORD,
  port: parseInt(env.POSTGRES_PORT, 10),
  database: isTesting() ? env.POSTGRES_TEST_DATABASE : env.POSTGRES_DATABASE
});
