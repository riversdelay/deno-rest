import { IBook } from "../types.ts";
import { client } from "../db/client.ts";

export class Book {
  private static table: string = "books";

  static async find(): Promise<IBook[]> {
    const query = await client.query(`SELECT * FROM ${this.table};`);
    return query.rows.map(([id, title, year]) => ({
      id,
      title,
      year
    }));
  }

  static async findOne(bookId: IBook["id"]): Promise<IBook | null> {
    const query = await client.query({
      text: `SELECT * FROM ${this.table} WHERE id = $1;`,
      args: [bookId]
    });

    const [result] = query.rows;
    if (!result) return null;

    const [id, title, year] = result;

    return {
      id,
      title,
      year
    };
  }

  static async insert(args: Omit<IBook, "id">): Promise<IBook> {
    const query = await client.query({
      text: `INSERT INTO ${this.table}(title, year) VALUES($1, $2) RETURNING *;`,
      args: [args.title, args.year]
    });

    const [id, title, year] = query.rows[0];

    return {
      id,
      title,
      year
    };
  }

  static async update(book: IBook): Promise<IBook> {
    const query = await client.query({
      text: `UPDATE ${this.table} SET title = $1, year = $2 WHERE id = $3 RETURNING *;`,
      args: [book.title, book.year, book.id]
    });

    const [id, title, year] = query.rows[0];

    return {
      id,
      title,
      year
    };
  }

  static async delete(id: IBook["id"]): Promise<void> {
    await client.query({
      text: `DELETE FROM ${this.table} WHERE id = $1;`,
      args: [id]
    });
  }
}
