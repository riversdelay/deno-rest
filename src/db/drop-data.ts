import { client } from "./client.ts";

export const dropData = async () => {
  await client.query(`
    DELETE FROM books;
    ALTER SEQUENCE books_id_seq RESTART WITH 1;
  `);
};
