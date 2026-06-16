import { asyncHandler } from "../../../shared/utils/asyncHandler.js";
import ApiResponse from "../../../shared/utils/ApiResponse.js";
import UserService from "./user.service.js";

class UserController {
  constructor(userService = new UserService()) {
    this.userService = userService;
  }

  createUser = asyncHandler(async (req, res) => {
    const user = await this.userService.createUser(
      req.validated.body
    );

    return new ApiResponse(
      201,
      "User created successfully",
      user
    ).send(res);
  });

  getAllUsers = asyncHandler(async (req, res) => {
    const users = await this.userService.getAllUsers(
      req.validated.query
    );

    return new ApiResponse(
      200,
      "Users fetched successfully",
      users
    ).send(res);
  });

  getUserById = asyncHandler(async (req, res) => {
    const user = await this.userService.getUserById(
      req.validated.params.id
    );

    return new ApiResponse(
      200,
      "User fetched successfully",
      user
    ).send(res);
  });

  updateUserRole = asyncHandler(async (req, res) => {
    const updatedUser =
      await this.userService.updateUserRole(
        req.validated.params.id,
        req.validated.body.role
      );

    return new ApiResponse(
      200,
      "User role updated successfully",
      updatedUser
    ).send(res);
  });

  deleteUser = asyncHandler(async (req, res) => {
    const deletedUser =
      await this.userService.deleteUser(
        req.validated.params.id
      );

    return new ApiResponse(
      200,
      "User deleted successfully",
      deletedUser
    ).send(res);
  });
}

export default UserController;
