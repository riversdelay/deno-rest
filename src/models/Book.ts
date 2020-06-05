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

    const {
      rows,
      rowDescription: { columns }
    } = await client.query(
      authorId
        ? {
            text: sql,
            args: [authorId]
          }
        : sql
    );

    return rows.map(row => this.formatRow(row, columns));
  }

  static async findOne(id: ID): Promise<IBook | null> {
    const {
      rows: [row],
      rowDescription: { columns }
    } = await client.query({
      text: `SELECT * FROM ${this.table} WHERE "id" = $1 LIMIT 1;`,
      args: [id]
    });

    if (!row) return null;

    return this.formatRow(row, columns);
  }

  static async insert(book: Omit<IBook, "id">): Promise<IBook> {
    const {
      rows: [row],
      rowDescription: { columns }
    } = await this.buildInsert(book);

    return this.formatRow(row, columns);
  }

  static async update(book: Omit<IBook, "authorId">): Promise<IBook | null> {
    const {
      rows: [row],
      rowDescription: { columns }
    } = await this.buildUpdate(book);

    if (!row) return null;

    return this.formatRow(row, columns);
  }

  static async delete(id: ID): Promise<void> {
    await client.query({
      text: `DELETE FROM ${this.table} WHERE "id" = $1;`,
      args: [id]
    });
  }
}
