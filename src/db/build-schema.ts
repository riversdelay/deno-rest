import "https://deno.land/x/dotenv/load.ts";
import { client } from "./client.ts";

await client.connect();

await client.query(`
  CREATE TABLE books (
    id serial PRIMARY KEY,
    title varchar(256) NOT NULL,
    year int NOT NULL,
    pages int NOT NULL,
    genre varchar(256) NOT NULL,
    language varchar(256) NOT NULL,
    edition varchar(256) NOT NULL,
    isbn bigint NOT NULL
  );
`);

await client.end();
