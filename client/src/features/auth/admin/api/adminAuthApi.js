import apiClient from "../../../../shared/lib/axios.js";
import { UserRole } from "../../../scorer-console/pages/type.js";

export const ADMIN_AUTH_STORAGE_KEY = "boundaryline_auth_user";
export const ADMIN_SESSION_RESTORE_KEY = "boundaryline_restore_session";
export const ADMIN_ROLES = [UserRole.ADMIN, UserRole.SUPER_ADMIN];

export const clearAdminSession = () => {
  window.localStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(ADMIN_SESSION_RESTORE_KEY);
  window.localStorage.removeItem("boundaryline_token");
  window.localStorage.removeItem("boundaryline_refresh_token");
};

export const loginAdmin = async ({ email, password }) => {
  const response = await apiClient.post("/auth/login", { email, password });
  const user = response.data?.data;

  if (!user) {
    throw new Error("Login response did not include a user profile.");
  }

  if (!ADMIN_ROLES.includes(user.role)) {
    await apiClient.post("/auth/logout").catch(() => {});
    clearAdminSession();
    throw new Error("This account does not have admin access.");
  }

  return user;
};

export const persistAdminSession = ({ user, remember }) => {
  const storage = remember ? window.localStorage : window.sessionStorage;
  const otherStorage = remember ? window.sessionStorage : window.localStorage;
  const value = JSON.stringify({ user, role: user.role, token: null });

  storage.setItem(ADMIN_AUTH_STORAGE_KEY, value);
  otherStorage.removeItem(ADMIN_AUTH_STORAGE_KEY);
};

export const logoutAdmin = async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch {
    // Local logout should still complete if the API is temporarily unavailable.
  } finally {
    clearAdminSession();
  }
};

export const getGoogleAuthUrl = () => {
  window.sessionStorage.setItem(ADMIN_SESSION_RESTORE_KEY, "1");
  return `${apiClient.defaults.baseURL}/auth/google`;
};
