export function asyncHandler(handler) {
  // What: wrap an async Express handler.
  // Why: controllers can throw errors without writing try/catch in every route.
  // How: return a middleware function that forwards rejected promises to next().
  return async function asyncRouteHandler(req, res, next) {
    // What: execute the original handler with Express arguments.
    // Why: route/controller behavior remains unchanged while errors are centralized.
    // How: await the handler and pass any thrown error to Express error middleware.
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
