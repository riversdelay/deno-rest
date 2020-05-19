import { Client } from "https://deno.land/x/postgres/mod.ts";

const env = Deno.env.toObject();

export const client = new Client({
  user: env.POSTGRES_USER,
  database: env.POSTGRES_DATABASE,
  hostname: env.POSTGRES_HOST,
  password: env.POSTGRES_PASSWORD,
  port: parseInt(env.POSTGRES_PORT, 10)
});
