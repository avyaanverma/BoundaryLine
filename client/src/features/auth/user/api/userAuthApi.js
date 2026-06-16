import apiClient from "../../../../shared/lib/axios.js";

export const USER_AUTH_STORAGE_KEY = "boundaryline_auth_user";

export const clearUserSession = () => {
  window.localStorage.removeItem(USER_AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(USER_AUTH_STORAGE_KEY);
  window.localStorage.removeItem("boundaryline_token");
  window.localStorage.removeItem("boundaryline_refresh_token");
};

/**
 * Login a user with email and password.
 * POST /auth/login
 */
export const loginUser = async ({ email, password }) => {
  const response = await apiClient.post("/auth/login", { email, password });
  const user = response.data?.data;

  if (!user) {
    throw new Error("Login response did not include a user profile.");
  }

  return user;
};

/**
 * Register a new user account.
 * POST /auth/register
 * Backend expects: { name, email, password }
 */
export const registerUser = async ({ name, email, password }) => {
  const response = await apiClient.post("/auth/register", {
    name,
    email,
    password,
  });
  const user = response.data?.data;

  if (!user) {
    throw new Error("Registration response did not include a user profile.");
  }

  return user;
};

/**
 * Persist user session to localStorage/Redux-compatible shape.
 */
export const persistUserSession = ({ user, remember = false }) => {
  const storage = remember ? window.localStorage : window.sessionStorage;
  const otherStorage = remember ? window.sessionStorage : window.localStorage;
  const value = JSON.stringify({ user, role: user.role, token: null });

  storage.setItem(USER_AUTH_STORAGE_KEY, value);
  otherStorage.removeItem(USER_AUTH_STORAGE_KEY);
};

/**
 * Logout the current user.
 * POST /auth/logout
 */
export const logoutUser = async () => {
  try {
    await apiClient.post("/auth/logout");
  } catch {
    // Local logout should still complete if the API is temporarily unavailable.
  } finally {
    clearUserSession();
  }
};
