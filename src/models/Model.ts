import { QueryConfig } from "https://deno.land/x/postgres/query.ts";
import { ID } from "../types.ts";

export class Model {
  protected static table: string;

  protected static buildInsertSQL<T extends object>(obj: T): QueryConfig {
    const keys = Object.keys(obj);
    const columns = keys.join(",");
    const values = keys.map((_, i) => `$${i + 1}`).join(",");

    return {
      text: `INSERT INTO ${this.table}(${columns}) VALUES(${values}) RETURNING *;`,
      args: Object.values(obj)
    };
  }

  protected static buildUpdateSQL<T extends { id: ID }>(obj: T): QueryConfig {
    const { id } = obj;
    delete obj.id;

    const keys = Object.keys(obj);

    const columnsValues = keys.reduce((sql, key, i) => {
      // add 1 extra because id will be the first
      sql += `${key} = $${i + 2}`;

      if (i !== keys.length - 1) sql += ",";

      return sql;
    }, "");

    return {
      text: `UPDATE ${this.table} SET ${columnsValues} WHERE id = $1 RETURNING *;`,
      args: [id, ...Object.values(obj)]
    };
  }
}
