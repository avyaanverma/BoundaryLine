import { app_config } from "../../../constant/app.constant.js";
import AuthService from "./auth.service.js";
import AppError from "../../../shared/error/AppError.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import env from "../../../config/env.js";
import AppError from "../../../shared/error/AppError.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

export default class AuthController {
  constructor() {
    this.userService = new AuthService();
  }

  async makeAdmin(req, res) {
    await this.userService.makeAdmin("om@example.com");

    res.json({
      success: true,
      message: "User promoted to ADMIN",
    });
  }

  async GoogleCallback(req, res) {
    const { accessToken, refreshToken } = await this.userService.googleLogin(
      req.user,
    );

    res.cookie("accessToken", accessToken, app_config().cookie.accessToken);
    res.cookie("refreshToken", refreshToken, app_config().cookie.refreshToken);

    res.redirect(env.REDIRECT_URL);
  }

  async registerController(req, res) {
    const userData = req.body;

    // add this in auth.validator
    // if (!userData)
    //   throw new AppError("Request body is required.", StatusCodes.BAD_REQUEST);

    const { accessToken, refreshToken } =
      await this.userService.registerService(userData);

    res.cookie("accessToken", accessToken, app_config().cookie.accessToken);
    res.cookie("refreshToken", refreshToken, app_config().cookie.refreshToken);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User registered successfully",
    });
  }

  async loginController(req, res) {
    const userData = req.body;
    if (!userData)
      throw new AppError("Request body is required.", StatusCodes.BAD_REQUEST);

    const { accessToken, refreshToken, user } =
      await this.userService.loginService(userData);

    res.cookie("accessToken", accessToken, app_config().cookie.accessToken);
    res.cookie("refreshToken", refreshToken, app_config().cookie.refreshToken);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User LoggedIn Successfully",
      data: user,
    });
  }
}
