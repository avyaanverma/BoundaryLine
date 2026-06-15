import { app_config } from "../../../constant/app.constant.js";
import AuthService from "./auth.service.js";
import env from "../../../config/env.js";

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
    const { accessToken, refreshToken } = await this.userService.CreateUser(
      req.user,
    );

    res.cookie("accessToken", accessToken, app_config().jwt.accessToken);
    res.cookie("refreshToken", refreshToken, app_config().jwt.refreshToken);

    res.redirect(env.REDIRECT_URL);
  }
}
