import { app_config } from "../../constant/app.constant.js";

export const setAuthCookies = (
  res,
  accessToken,
  refreshToken
) => {
  const config = app_config();

  res.cookie(
    "accessToken",
    accessToken,
    config.cookie.accessToken
  );

  res.cookie(
    "refreshToken",
    refreshToken,
    config.cookie.refreshToken
  );
};

export const clearAuthCookies = (res) => {
  const config = app_config();

  res.clearCookie(
    "accessToken",
    config.cookie.accessToken
  );

  res.clearCookie(
    "refreshToken",
    config.cookie.refreshToken
  );
};