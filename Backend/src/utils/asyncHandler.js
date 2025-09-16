import ApiError from "./ApiError.js";

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error(error);
    console.error("Error caught in asyncHandler:", error.statusCode);

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
      statusCode,
      success: false,
      data: null,
      error: error.error || [],
      message: error.message || "Internal Server Error",
    });
  }
};

export default asyncHandler;
