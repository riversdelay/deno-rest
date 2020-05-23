import { Context } from "https://deno.land/x/denotrain@v0.4.4/mod.ts";
import { IResponse, IAuthor, ID } from "../types.ts";
import { Author } from "../models/Author.ts";
import { Validator } from "../validation/Validator.ts";
import {
  errorResponse,
  goodResponse,
  serverErrorResponse,
  notFoundResponse
} from "../utils/responses.ts";
import {
  idValidationSchema,
  authorValidationSchema
} from "../validation/schemas.ts";

export class AuthorController {
  // @route GET /api/authors
  static async getAll({ res }: Context): Promise<IResponse<IAuthor[]>> {
    try {
      const authors = await Author.find();
      return goodResponse(authors);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route GET /api/authors/:id
  static async getSingle({ req, res }: Context): Promise<IResponse<IAuthor>> {
    const id = req.params.id as ID;

    const v = new Validator({ id }, { id: idValidationSchema });
    const errors = v.validate();

    if (errors.length) {
      res.setStatus(400);
      return errorResponse(errors);
    }

    try {
      const author = await Author.findOne(id);

      if (!author) {
        res.setStatus(400);
        return notFoundResponse("author");
      }

      return goodResponse(author);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route POST /api/authors
  static async create({ req, res }: Context): Promise<IResponse<IAuthor>> {
    try {
      const { name } = req.body as Omit<IAuthor, "id">;
      const args: Omit<IAuthor, "id"> = { name };

      const v = new Validator(args, authorValidationSchema);
      const errors = v.validate();

      if (errors.length) {
        res.setStatus(400);
        return errorResponse(errors);
      }

      const author = await Author.insert(args);

      res.setStatus(201);
      return goodResponse(author);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route PUT /api/authors/:id
  static async edit({ req, res }: Context): Promise<IResponse<IAuthor>> {
    try {
      const { name } = req.body as Omit<IAuthor, "id">;
      const args: IAuthor = { id: req.params.id as ID, name };

      const v = new Validator(args, {
        id: idValidationSchema,
        ...authorValidationSchema
      });

      const errors = v.validate();

      if (errors.length) {
        res.setStatus(400);
        return errorResponse(errors);
      }

      const author = await Author.update(args);

      if (!author) {
        res.setStatus(400);
        return notFoundResponse("author");
      }

      return goodResponse(author);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route DELETE /api/authors/:id
  static async remove({ req, res }: Context): Promise<IResponse<boolean>> {
    const id = req.params.id as ID;

    const v = new Validator({ id }, { id: idValidationSchema });
    const errors = v.validate();

    if (errors.length) {
      res.setStatus(400);
      return errorResponse(errors);
    }

    try {
      await Author.delete(id);
      return goodResponse(true);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }
}
