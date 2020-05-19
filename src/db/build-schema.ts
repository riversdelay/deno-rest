import "https://deno.land/x/dotenv/load.ts";
import { client } from "./client.ts";

await client.connect();

await client.query(`
  CREATE TABLE books (
    id serial PRIMARY KEY,
    title varchar(256) NOT NULL,
    year int NOT NULL
  );
`);

await client.end();
