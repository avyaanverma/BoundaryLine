import { app_config } from "../../../constant/app.constant.js";
import AuthService from "./auth.service.js";
import { StatusCodes } from "http-status-codes";
import env from "../../../config/env.js";
import buildSuccessResponse from "../../../shared/successResponse/buildSuccessResponse.js";

export default class AuthController {
  constructor() {
    this.userService = new AuthService();
  }

  async makeAdmin(req, res) {
    const { email, role } = req.validated.body;

    const user = await this.userService.makeAdmin(email, role);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `User role updated to ${role}`,
      data: user,
    });
  }

  async getMe(req, res) {
    res.status(200).json(new buildSuccessResponse("User verified", req.user));
  }

  async refreshAccessToken(req, res) {
    const { accessToken } = this.userService.refreshAccessToken(req.cookies);
    res.cookie("accessToken", accessToken, app_config().cookie.accessToken);
    return res.status(StatusCodes.OK).json({
      messgae: "Token generated successfully",
    });
  }

  async GoogleCallback(req, res) {
    const { accessToken, refreshToken } = await this.userService.googleLogin(
      req.user,
    );

    setAuthCookies(res, accessToken, refreshToken);

    res.redirect(env.REDIRECT_URL);
  }

  async registerController(req, res) {
    const userData = req.validated.body;
    const { accessToken, refreshToken, user } =
      await this.userService.registerService(userData);

    setAuthCookies(res, accessToken, refreshToken);

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  }

  async loginController(req, res) {
    const userData = req.validated.body;
    const { accessToken, refreshToken, user } =
      await this.userService.loginService(userData);

    setAuthCookies(res, accessToken, refreshToken);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User LoggedIn Successfully",
      data: user,
    });
  }

  async meController(req, res) {
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Authenticated user fetched successfully",
      data: req.user,
    });
  }

  async logoutController(_req, res) {
    clearAuthCookies(res);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "User logged out successfully",
    });
  }
}
