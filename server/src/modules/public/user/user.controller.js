import { StatusCodes } from "http-status-codes";

import PublicUserService from "./user.service.js";

import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";

export default class PublicUserController {
  constructor(
    userService = new PublicUserService()
  ) {
    this.userService = userService;
  }

  registerUser = asyncHandler(async (req, res) => {
    const user =
      await this.userService.createUser(
        req.validated?.body || req.body
      );

    return new ApiResponse(
      StatusCodes.CREATED,
      "User created successfully",
      user
    ).send(res);
  });

  loginUser = asyncHandler(async (req, res) => {
    const user =
      await this.userService.loginUser(
        req.validated?.body || req.body
      );

    return new ApiResponse(
      StatusCodes.OK,
      "Login successful",
      user
    ).send(res);
  });

  getUser = asyncHandler(async (req, res) => {
    const user =
      await this.userService.getUserById(
        req.params.id
      );

    return new ApiResponse(
      StatusCodes.OK,
      "User fetched successfully",
      user
    ).send(res);
  });
}