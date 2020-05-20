export type ID = number;

export interface IBook {
  id: ID;
  title: string;
  year: number;
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

export interface MinMaxRule {
  min?: number;
  max?: number;
}

export interface ValidatorRules {
  required?: boolean;
  string?: MinMaxRule;
  integer?: MinMaxRule;
}
