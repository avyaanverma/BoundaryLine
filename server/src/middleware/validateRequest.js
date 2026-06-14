import { z } from "zod";
import BadRequest from "../shared/error/BadRequest.js";

export function validateRequest(schema) {
  // What: create reusable Zod validation middleware.
  // Why: route files should declare validation once and controllers should receive trusted data.
  // How: return middleware that validates body, params, and query together.
  return function validateRequestMiddleware(req, _res, next) {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      next(new BadRequest("Validation failed", z.treeifyError(result.error)));
      return;
    }

    req.validated = result.data;
    next();
  };
}
