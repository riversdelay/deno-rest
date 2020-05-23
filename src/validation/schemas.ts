import { ValidatorRules, Rules, IBook, IAuthor } from "../types.ts";
import { minStringLength, maxStringLength } from "../utils/constants.ts";

export const idValidationSchema: ValidatorRules = {
  required: true,
  integer: {
    min: 1
  }
};

export const bookValidationSchema = (): Rules<Omit<IBook, "id">> => ({
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
  },
  pages: {
    required: true,
    integer: {
      min: 1
    }
  },
  genre: {
    required: true,
    string: {
      min: minStringLength,
      max: maxStringLength
    }
  },
  language: {
    required: true,
    string: {
      min: 2,
      max: maxStringLength
    }
  },
  edition: {
    required: true,
    string: {
      min: minStringLength,
      max: maxStringLength
    }
  },
  isbn: {
    required: true,
    isbn: true,
    integer: {
      min: 1
    }
  }
});

export const authorValidationSchema: Rules<Omit<IAuthor, "id">> = {
  name: {
    required: true,
    string: {
      min: minStringLength,
      max: maxStringLength
    }
  }
};
