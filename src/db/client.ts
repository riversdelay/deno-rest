import { Client } from "https://deno.land/x/postgres/mod.ts";
import { isTesting } from "../utils/isTesting.ts";

const env = Deno.env.toObject();

export const client = new Client({
  user: env.POSTGRES_USER,
  hostname: env.POSTGRES_HOST,
  password: env.POSTGRES_PASSWORD,
  port: parseInt(env.POSTGRES_PORT, 10),
  database: isTesting() ? env.POSTGRES_TEST_DATABASE : env.POSTGRES_DATABASE
});
