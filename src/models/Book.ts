import { Model } from "./Model.ts";
import { IBook, ID } from "../types.ts";
import { client } from "../db/client.ts";

export class Book extends Model {
  protected static readonly table: string = "books";

  static async find(authorId?: ID): Promise<IBook[]> {
    let sql = `SELECT * FROM ${this.table}`;

    if (authorId) {
      sql += ` WHERE "authorId" = $1`;
    }

    sql += ` ORDER BY "id";`;

    const result = await client.query(
      authorId
        ? {
            text: sql,
            args: [authorId]
          }
        : sql
    );

    return result.rows.map(row =>
      this.formatRow(row, result.rowDescription.columns)
    );
  }

  static async findOne(id: ID): Promise<IBook | null> {
    const result = await client.query({
      text: `SELECT * FROM ${this.table} WHERE "id" = $1 LIMIT 1;`,
      args: [id]
    });

    const [row] = result.rows;
    if (!row) return null;

    return this.formatRow(row, result.rowDescription.columns);
  }

  static async insert(book: Omit<IBook, "id">): Promise<IBook> {
    const result = await this.buildInsert(book);

    return this.formatRow(result.rows[0], result.rowDescription.columns);
  }

  static async update(book: Omit<IBook, "authorId">): Promise<IBook | null> {
    const result = await this.buildUpdate(book);

    const [row] = result.rows;
    if (!row) return null;

    return this.formatRow(row, result.rowDescription.columns);
  }

  static async delete(id: ID): Promise<void> {
    await client.query({
      text: `DELETE FROM ${this.table} WHERE "id" = $1;`,
      args: [id]
    });
  }
}
