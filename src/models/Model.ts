import { Column } from "../dependencies.ts";
import { QueryConfig } from "../dependencies.ts";
import { ID } from "../types.ts";

export class Model {
  protected static readonly table: string;

  protected static formatRow(row: any[], columns: Column[]): any {
    return row.reduce<Record<string, any>>(
      (data, field, i) => Object.assign(data, { [columns[i].name]: field }),
      {}
    );
  }

  protected static buildInsertSQL<T extends object>(obj: T): QueryConfig {
    const keys = Object.keys(obj);

    const [columns, values] = keys.reduce<[string[], string[]]>(
      ([c, v], key, i) => [
        [...c, `"${key}"`],
        [...v, `$${i + 1}`]
      ],
      [[], []]
    );

    return {
      text: `
        INSERT INTO 
          ${this.table}
            (${columns.join(",")})
          VALUES
            (${values.join(",")})
        RETURNING *;
      `,
      args: Object.values(obj)
    };
  }

  protected static buildUpdateSQL<T extends { id: ID }>(obj: T): QueryConfig {
    const { id } = obj;
    delete obj.id;

    const keys = Object.keys(obj);

    const columnsValues = keys.reduce((sql, key, i) => {
      // add 1 extra because id will be the first
      sql += `"${key}" = $${i + 2}`;

      if (i !== keys.length - 1) sql += ",";

      return sql;
    }, "");

    return {
      text: `UPDATE ${this.table} SET ${columnsValues} WHERE "id" = $1 RETURNING *;`,
      args: [id, ...Object.values(obj)]
    };
  }
}
