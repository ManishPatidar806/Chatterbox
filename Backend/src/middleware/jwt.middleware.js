import jwt from "jsonwebtoken";
import ApiResponse from "../utils/ApiResponse";

const verifyToken = async (req, res, next) => {
  try {
    const accessToken = req.cookies?.accesstoken;
    if (!accessToken) {
      return res
        .status(401)
        .json(new ApiResponse(401, "Access token not found"));
    }
    const decode = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).json(new ApiResponse(403, "Access Token Expired"));
  }
};

export default verifyToken;
