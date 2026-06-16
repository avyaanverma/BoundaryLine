import { configureStore, createSlice } from "@reduxjs/toolkit";
import matchReducer from "../../features/scoreboard/store/mathSlice.js";

const AUTH_STORAGE_KEY = "boundaryline_auth_user";

export const clearStoredAuth = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
  window.localStorage.removeItem("boundaryline_token");
  window.localStorage.removeItem("boundaryline_refresh_token");
};

const readStoredAuth = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue =
    window.localStorage.getItem(AUTH_STORAGE_KEY) ||
    window.sessionStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    clearStoredAuth();
    return null;
  }
};

const storedAuth = readStoredAuth();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: storedAuth?.user ?? null,
    role: storedAuth?.role ?? null,
    token: storedAuth?.token ?? null,
    isAuthenticated: Boolean(storedAuth?.user && storedAuth?.role),
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    login: (state, action) => {
      const user = action.payload.user ?? action.payload;
      state.user = user;
      state.role = user.role;
      state.token = action.payload.token ?? null;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.isAuthenticated = false;
      clearStoredAuth();
    },
  },
});

export const { setRole, login, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    match: matchReducer,
  },
});

export default store;
