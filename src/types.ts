export type ID = number;

interface INode {
  id: ID;
}

export interface IAuthor extends INode {
  name: string;
}

export interface IBook extends INode {
  authorId: ID;
  title: string;
  year: number;
  pages: number;
  genre: string;
  language: string;
  edition: string;
  isbn: number;
}

export interface IError {
  path: string | null;
  message: string;
}

export interface IGoodResponse<T> {
  ok: true;
  errors: null;
  data: T;
}

export interface IErrorResponse {
  ok: false;
  errors: IError[];
  data: null;
}

export type IResponse<T> = IErrorResponse | IGoodResponse<T>;

interface MinMaxRule {
  min?: number;
  max?: number;
}

export interface ValidatorRules {
  required?: boolean;
  string?: MinMaxRule;
  integer?: MinMaxRule;
  isbn?: boolean;
}

export type Rules<T> = { [K in keyof T]?: ValidatorRules };
