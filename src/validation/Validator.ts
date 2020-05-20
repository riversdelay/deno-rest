import { ValidatorRules, IError } from "../types.ts";

export class Validator<T extends object> {
  constructor(
    private data: T,
    private rules: { [K in keyof T]?: ValidatorRules }
  ) {}

  private isDefined(value: any): boolean {
    return value !== undefined;
  }

  private isString(value: any): boolean {
    return typeof value === "string";
  }

  private isInt(value: any): boolean {
    return typeof value === "number" && Number.isInteger(value);
  }

  private strMinLength(str: string, min: number): boolean {
    return str.length >= min;
  }

  private strMaxLength(str: string, max: number): boolean {
    return str.length <= max;
  }

  private intMin(int: number, min: number): boolean {
    return int >= min;
  }

  private intMax(int: number, max: number): boolean {
    return int <= max;
  }

  validate(): IError[] {
    const errors: IError[] = [];

    for (const key in this.rules) {
      const rule = this.rules[key];
      if (!rule) continue;

      const { required, integer, string } = rule!;
      const value = this.data[key] as any;

      if (!this.isDefined(value)) {
        if (!required) continue;

        errors.push({
          path: key,
          message: `${key} is required`
        });
      }

      if (integer) {
        if (this.isInt(value)) {
          const { min, max } = integer;

          if (min && !this.intMin(value, min)) {
            errors.push({
              path: key,
              message: `${key} needs to be equal to or higher than ${min}`
            });
          }

          if (max && !this.intMax(value, max)) {
            errors.push({
              path: key,
              message: `${key} needs to be equal to or lesser than ${max}`
            });
          }
        } else {
          errors.push({
            path: key,
            message: `${key} needs to be an integer`
          });
        }
      }

      if (string) {
        if (this.isString(value)) {
          const { min, max } = string;

          if (min && !this.strMinLength(value, min)) {
            errors.push({
              path: key,
              message: `${key}'s length needs to be equal to or higher than ${min}`
            });
          }

          if (max && !this.strMaxLength(value, max)) {
            errors.push({
              path: key,
              message: `${key}'s length needs to be equal to or lesser than ${max}`
            });
          }
        } else {
          errors.push({
            path: key,
            message: `${key} needs to be a string`
          });
        }
      }
    }

    return errors;
  }
}
