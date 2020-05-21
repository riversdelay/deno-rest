import { Context } from "https://deno.land/x/denotrain@v0.4.4/mod.ts";
import { IResponse, IBook, ID } from "../types.ts";
import { Book } from "../models/Book.ts";
import { Validator } from "../validation/Validator.ts";
import { notFoundResponse } from "../utils/responses.ts";
import {
  errorResponse,
  goodResponse,
  serverErrorResponse
} from "../utils/responses.ts";
import {
  idValidationSchema,
  bookValidationSchema
} from "../validation/schemas.ts";

export class BookController {
  // @route GET /api/books
  static async getAll({ res }: Context): Promise<IResponse<IBook[]>> {
    try {
      const books = await Book.find();
      return goodResponse(books);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route GET /api/books/:id
  static async getSingle({ req, res }: Context): Promise<IResponse<IBook>> {
    const id = req.params.id as ID;

    const v = new Validator({ id }, { id: idValidationSchema });
    const errors = v.validate();

    if (errors.length) {
      res.setStatus(400);
      return errorResponse(errors);
    }

    try {
      const book = await Book.findOne(id);

      if (!book) {
        res.setStatus(400);
        return errorResponse(notFoundResponse("book"));
      }

      return goodResponse(book);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route POST /api/books
  static async create({ req, res }: Context): Promise<IResponse<IBook>> {
    try {
      const { title, year } = req.body;
      const args = { title, year };

      const v = new Validator(args, bookValidationSchema());
      const errors = v.validate();

      if (errors.length) {
        res.setStatus(400);
        return errorResponse(errors);
      }

      const book = await Book.insert(args);

      res.setStatus(201);
      return goodResponse(book);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route PUT /api/books/:id
  static async edit({ req, res }: Context): Promise<IResponse<IBook>> {
    try {
      const { title, year } = req.body;
      const args = { id: req.params.id as ID, title, year };

      const v = new Validator(args, {
        id: idValidationSchema,
        ...bookValidationSchema()
      });

      const errors = v.validate();

      if (errors.length) {
        res.setStatus(400);
        return errorResponse(errors);
      }

      const book = await Book.update(args);

      if (!book) {
        res.setStatus(400);
        return errorResponse(notFoundResponse("book"));
      }

      return goodResponse(book);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route DELETE /api/books/:id
  static async remove({ req, res }: Context): Promise<IResponse<boolean>> {
    const id = req.params.id as ID;

    const v = new Validator({ id }, { id: idValidationSchema });
    const errors = v.validate();

    if (errors.length) {
      res.setStatus(400);
      return errorResponse(errors);
    }

    try {
      await Book.delete(id);
      return goodResponse(true);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }
}
