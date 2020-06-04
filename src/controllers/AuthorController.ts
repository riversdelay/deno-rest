import { Context } from "../dependencies.ts";
import { IController, IResponse, IAuthor, ID } from "../types.ts";
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

export class AuthorController implements IController {
  // @route GET /api/authors
  async getAll({ res }: Context): Promise<IResponse<IAuthor[]>> {
    try {
      const authors = await Author.find();
      return goodResponse(authors);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }

  // @route GET /api/authors/:id
  async getSingle({ req, res }: Context): Promise<IResponse<IAuthor>> {
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
  async create({ req, res }: Context): Promise<IResponse<IAuthor>> {
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
  async edit({ req, res }: Context): Promise<IResponse<IAuthor>> {
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
  async remove({ req, res }: Context): Promise<IResponse<IAuthor>> {
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

      await Author.delete(id);

      return goodResponse(author);
    } catch (err) {
      console.log(err);
      return serverErrorResponse(res);
    }
  }
}
