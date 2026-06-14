import { z } from "zod";
import BadRequest from "../error/BadRequest.js";

export function validateRequest(schema) {
  // What: create reusable Zod validation middleware.
  // Why: route files should declare validation once and controllers should receive trusted data.
  // How: return middleware that validates body, params, and query together.
  return function validateRequestMiddleware(req, _res, next) {
    // What: parse all request input surfaces.
    // Why: modules often need params and body together for safe business logic.
    // How: run safeParse so validation errors become controlled AppError responses.
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    if (!result.success) {
      // What: stop invalid requests before they reach service classes.
      // Why: services should not need to defend against malformed payload shapes.
      // How: forward a 400 AppError with Zod 4's structured error tree.
      next(new BadRequest("Validation failed", z.treeifyError(result.error)));
      return;
    }

    // What: attach parsed data to the request.
    // Why: controllers can read normalized values from one stable location.
    // How: store Zod output on req.validated and continue the middleware chain.
    req.validated = result.data;
    next();
  };
}
