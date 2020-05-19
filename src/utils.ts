import { IError, IErrorResponse, IGoodResponse } from "./types.ts";

export const errorResponse = (errors: IError[]): IErrorResponse => ({
  ok: false,
  errors,
  data: null
});

export const goodResponse = <T>(data: T): IGoodResponse<T> => ({
  ok: true,
  errors: null,
  data
});
