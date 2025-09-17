import { User } from "../model/user.model";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";

const signup = asyncHandler(async (req, res) => {
  const { fullName, email, password, confirmPassword } = req.body;
  if (
    [fullName, email, password, confirmPassword].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be required");
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, "Password does not match");
  }

  const existeduser = await User.findOne({ email });
  if (existeduser) {
    throw new ApiError(409, "User already existed");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "Internal Server error");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();

  res
    .cookie("accesstoken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

  return res
    .status(201)
    .json(new ApiResponse(201, "User Register Successfully", createdUser));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "email and password must be valid format");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not Found");
  }
  if (!(await user.isPasswordCorrect(password))) {
    throw new ApiError(400, "Incorrect Password");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();

  res
    .cookie("accesstoken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

  return res.status(201).json(new ApiResponse(204, "Login Successfully"));
});

const logout = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.refreshtoken;

  if (!refreshToken) {
    res.status(204).json(new ApiResponse(204, "User is already LoggedOut"));
  }

  const user = await User.findOne({ refreshToken });

  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res
    .clearCookie("accesstoken", {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    .clearCookie("refreshtoken", {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    .status(200)
    .json(new ApiResponse(200, "Logout Successfully "));
});

const removeAccount = asyncHandler(async (req, res) => {
  const userId = req.user;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  await User.deleteOne({ _id: userId });
  res
    .clearCookie("accesstoken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .clearCookie("refreshtoken", {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    .status(200)
    .json(new ApiResponse(200, "Account Remove Successfully "));
});

const getUserInfo = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const user = await User.findById(_id).select("-password -refreshToken");
  console.log(user);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res.status(200).json(new ApiResponse(200, "profile found", user));
});

const updateUserInfo = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!email || email.trim() === "") {
    throw new ApiError("Email must be required");
  }
  if (!name || name.trim() === "") {
    throw new ApiError("Name must be required");
  }
  const user = await User.findOne({ email }).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  user.fullName = name;
  await user.save();
  res
    .status(200)
    .json(new ApiResponse(200, "Profile Updated Successfully", user));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken");
  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "Password must be Same");
  }
  if (!(await user.isPasswordCorrect(currentPassword))) {
    throw new ApiError(400, "Invalid Passowrd");
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json(new ApiResponse(200, "Password change Successfully"));
});

export {
  login,
  signup,
  logout,
  removeAccount,
  getUserInfo,
  updateUserInfo,
  updatePassword,
};
