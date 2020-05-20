import { ValidatorRules, IBook } from "../types.ts";
import { minStringLength, maxStringLength } from "../utils/constants.ts";

export const idValidationSchema: ValidatorRules = {
  required: true,
  integer: {
    min: 1
  }
};

export const bookValidationSchema = (): Record<
  keyof Omit<IBook, "id">,
  ValidatorRules
> => ({
  title: {
    required: true,
    string: {
      min: minStringLength,
      max: maxStringLength
    }
  },
  year: {
    required: true,
    integer: {
      min: 1,
      max: new Date().getFullYear()
    }
  }
});
