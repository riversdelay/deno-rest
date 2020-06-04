import { Context } from "../dependencies.ts";
import { IController, IResponse, IBook, ID } from "../types.ts";
import { Book } from "../models/Book.ts";
import { Validator } from "../validation/Validator.ts";
import {
  errorResponse,
  goodResponse,
  serverErrorResponse,
  notFoundResponse
} from "../utils/responses.ts";
import {
  idValidationSchema,
  bookValidationSchema
} from "../validation/schemas.ts";

export class BookController implements IController {
  // @route GET /api/books
  async getAll({ req, res }: Context): Promise<IResponse<IBook[]>> {
    const { authorId } = req.body;

    const v = new Validator(
      { authorId },
      {
        authorId: {
          ...idValidationSchema,
          required: false
        }
      }
    );

    const errors = v.validate();

    if (errors.length) {
      res.setStatus(400);
      return errorResponse(errors);
    }

    try {
      const books = await Book.find(authorId);
      return goodResponse(books);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route GET /api/books/:id
  async getSingle({ req, res }: Context): Promise<IResponse<IBook>> {
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
        return notFoundResponse("book");
      }

      return goodResponse(book);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route POST /api/books
  async create({ req, res }: Context): Promise<IResponse<IBook>> {
    try {
      const {
        authorId,
        title,
        year,
        pages,
        genre,
        language,
        edition,
        isbn
      } = req.body as Omit<IBook, "id">;

      const args: Omit<IBook, "id"> = {
        authorId,
        title,
        year,
        pages,
        genre,
        language,
        edition,
        isbn
      };

      const v = new Validator(args, {
        ...bookValidationSchema(),
        authorId: idValidationSchema
      });
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
  async edit({ req, res }: Context): Promise<IResponse<IBook>> {
    try {
      const {
        title,
        year,
        pages,
        genre,
        language,
        edition,
        isbn
      } = req.body as Omit<IBook, "id" | "authorId">;

      const args: Omit<IBook, "authorId"> = {
        id: req.params.id as ID,
        title,
        year,
        pages,
        genre,
        language,
        edition,
        isbn
      };

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
        return notFoundResponse("book");
      }

      return goodResponse(book);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route DELETE /api/books/:id
  async remove({ req, res }: Context): Promise<IResponse<IBook>> {
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
        return notFoundResponse("book");
      }

      await Book.delete(id);

      return goodResponse(book);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }
}
