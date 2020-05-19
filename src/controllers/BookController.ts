import { Context } from "https://deno.land/x/denotrain@v0.4.0/mod.ts";
import { IResponse, IBook } from "../types.ts";
import { Book } from "../models/Book.ts";
import { errorResponse, goodResponse } from "../utils.ts";
import { serverError } from "../constants.ts";

export class BookController {
  static async getAll({ res }: Context): Promise<IResponse<IBook[]>> {
    try {
      const books = await Book.find();
      return goodResponse(books);
    } catch (err) {
      console.log(err);
      res.setStatus(500);
      return errorResponse([
        {
          path: null,
          message: serverError
        }
      ]);
    }
  }

  static async getSingle({ req, res }: Context): Promise<IResponse<IBook>> {
    try {
      const book = await Book.findOne(req.params.id as number);

      if (!book) {
        res.setStatus(400);
        return errorResponse([
          {
            path: "id",
            message: "Could not find book by given ID"
          }
        ]);
      }

      return goodResponse(book);
    } catch (err) {
      console.log(err);
      res.setStatus(500);
      return errorResponse([
        {
          path: null,
          message: serverError
        }
      ]);
    }
  }

  static async create({ req, res }: Context): Promise<IResponse<IBook>> {
    try {
      const { title, year } = req.body;
      const book = await Book.insert({ title, year });
      return goodResponse(book);
    } catch (err) {
      console.log(err);
      res.setStatus(500);
      return errorResponse([
        {
          path: null,
          message: serverError
        }
      ]);
    }
  }

  static async edit({ req, res }: Context): Promise<IResponse<IBook>> {
    try {
      const { title, year } = req.body;
      const book = await Book.update({
        id: req.params.id as number,
        title,
        year
      });

      return goodResponse(book);
    } catch (err) {
      console.log(err);
      res.setStatus(500);
      return errorResponse([
        {
          path: null,
          message: serverError
        }
      ]);
    }
  }

  static async remove({ req, res }: Context): Promise<IResponse<boolean>> {
    try {
      await Book.delete(req.params.id as number);
      return goodResponse(true);
    } catch (err) {
      console.log(err);
      res.setStatus(500);
      return errorResponse([
        {
          path: null,
          message: serverError
        }
      ]);
    }
  }
}
