export const globalErrHandler = (err, req, res, next) => {
  // stack
  const stack = err?.stack;
  const statusCode = err?.statusCode ? err?.statusCode : 500;
  // message
  const message = err?.message;

  res.status(statusCode).json({
    stack,
    message,
  });
};

// handle 404 err
export const notFound = (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  next(err);
};
