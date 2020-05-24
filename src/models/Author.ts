import { IAuthor, ID } from "../types.ts";
import { client } from "../db/client.ts";

export class Author {
  private static table: string = "authors";

  private static formatRow([id, name]: any[]): IAuthor {
    return { id, name };
  }

  static async find(): Promise<IAuthor[]> {
    const result = await client.query(
      `SELECT * FROM ${this.table} ORDER BY id;`
    );

    return result.rows.map(row => this.formatRow(row));
  }

  static async findOne(id: ID): Promise<IAuthor | null> {
    const result = await client.query({
      text: `SELECT * FROM ${this.table} WHERE id = $1 LIMIT 1;`,
      args: [id]
    });

    const [row] = result.rows;
    if (!row) return null;

    return this.formatRow(row);
  }

  static async insert(author: Omit<IAuthor, "id">): Promise<IAuthor> {
    const result = await client.query({
      text: `INSERT INTO ${this.table}(name) VALUES($1) RETURNING *;`,
      args: Object.values(author)
    });

    return this.formatRow(result.rows[0]);
  }

  static async update(author: IAuthor): Promise<IAuthor | null> {
    const result = await client.query({
      text: `UPDATE ${this.table} SET name = $2 WHERE id = $1 RETURNING *;`,
      args: Object.values(author)
    });

    const [row] = result.rows;
    if (!row) return null;

    return this.formatRow(row);
  }

  static async delete(id: ID): Promise<void> {
    await client.query({
      text: `DELETE FROM ${this.table} WHERE id = $1;`,
      args: [id]
    });
  }
}
