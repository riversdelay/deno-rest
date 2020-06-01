import { IError, IErrorResponse, IGoodResponse } from "../types.ts";
import { Response } from "../dependencies.ts";

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
      message: "Internal Server Error"
    }
  ]);
};

export const notFoundResponse = (key: string) =>
  errorResponse([
    {
      path: "id",
      message: `Could not find ${key} by given ID`
    }
  ]);
