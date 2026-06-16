import { app_config } from "../../../constant/app.constant.js";
import AuthService from "./auth.service.js";
import { StatusCodes } from "http-status-codes";
import env from "../../../config/env.js";

function getClearCookieOptions(cookieOptions) {
  // What: derive clear-cookie options from the original cookie settings.
  // Why: Express should clear the same cookie path/security attributes it set.
  // How: keep only attributes relevant to identifying and clearing the cookie.
  return {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    ...(cookieOptions.path ? { path: cookieOptions.path } : {}),
  };
}

function setAuthCookies(res, accessToken, refreshToken) {
  // What: attach auth cookies to a successful auth response.
  // Why: browser clients use HTTP-only cookies for protected API calls.
  // How: reuse the environment-aware app cookie config.
  const config = app_config(env.NODE_ENV);
  res.cookie("accessToken", accessToken, config.cookie.accessToken);
  res.cookie("refreshToken", refreshToken, config.cookie.refreshToken);
}

function clearAuthCookies(res) {
  // What: remove auth cookies from the browser.
  // Why: logout must clear HTTP-only cookies that frontend JavaScript cannot delete.
  // How: use matching security options without maxAge.
  const config = app_config(env.NODE_ENV);
  res.clearCookie(
    "accessToken",
    getClearCookieOptions(config.cookie.accessToken),
  );
  res.clearCookie(
    "refreshToken",
    getClearCookieOptions(config.cookie.refreshToken),
  );
}

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
