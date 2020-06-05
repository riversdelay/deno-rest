import { Model } from "./Model.ts";
import { IAuthor, ID } from "../types.ts";
import { client } from "../db/client.ts";

export class Author extends Model {
  protected static readonly table: string = "authors";

  static async find(): Promise<IAuthor[]> {
    const {
      rows,
      rowDescription: { columns }
    } = await client.query(`SELECT * FROM ${this.table} ORDER BY "id";`);

    return rows.map(row => this.formatRow(row, columns));
  }

  static async findOne(id: ID): Promise<IAuthor | null> {
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

  static async insert(author: Omit<IAuthor, "id">): Promise<IAuthor> {
    const {
      rows: [row],
      rowDescription: { columns }
    } = await this.buildInsert(author);

    return this.formatRow(row, columns);
  }

  static async update(author: IAuthor): Promise<IAuthor | null> {
    const {
      rows: [row],
      rowDescription: { columns }
    } = await this.buildUpdate(author);

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
