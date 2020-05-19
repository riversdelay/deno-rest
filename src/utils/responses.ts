import { IError, IErrorResponse, IGoodResponse } from "../types.ts";
import { Response } from "https://deno.land/x/denotrain@v0.4.0/mod.ts";
import { serverError } from "./constants.ts";

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

export const serverErrorResponse = (res: Response) => {
  res.setStatus(500);
  return errorResponse([
    {
      path: null,
      message: serverError
    }
  ]);
};
