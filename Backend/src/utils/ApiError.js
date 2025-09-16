class ApiError extends Error {
  constructor(
    statusCode = 500,
    message = "Something went wrong",
    error = [],
    stack = ""
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
    this.data = null;
    this.success = false;
    this.stack = stack;
  }
}

export default ApiError;
