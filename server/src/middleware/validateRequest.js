import { ZodError } from "zod";

export const validateRequest = (schemas) => {
  return (req, res, next) => {
    try {
      const validated = {
        body: req.body,
        params: req.params,
        query: req.query,
      };

      const shape = schemas?.shape || schemas || {};

      if (shape.body && typeof shape.body.parse === "function") {
        validated.body = shape.body.parse(req.body);
      }

      if (shape.params && typeof shape.params.parse === "function") {
        validated.params = shape.params.parse(req.params);
      }

      if (shape.query && typeof shape.query.parse === "function") {
        validated.query = shape.query.parse(req.query);
      }

      req.validated = validated;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          errors: error.flatten(),
        });
      }

      next(error);
    }
  };
};