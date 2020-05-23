import "https://deno.land/x/dotenv/load.ts";
import { client } from "./client.ts";

await client.connect();

await client.query(`
  DROP TABLE IF EXISTS authors;
  DROP TABLE IF EXISTS books;

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

  CREATE TABLE authors (
    id serial PRIMARY KEY,
    name varchar(256) NOT NULL
  );
`);

await client.end();
