import { configureStore, createSlice } from "@reduxjs/toolkit";
import matchReducer from "../../features/scoreboard/store/mathSlice.js";
import { UserRole } from "../../features/scorer-console/pages/type.js";

const authPlaceholderSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      id: "u-1",
      username: "boundaryline_scorer",
      email: "ommhatre379@gmail.com",
    },//s
    role: UserRole.ADMIN, // Default to SCORER so scorer controls are active!
    token: "jwt-test-token",
    isAuthenticated: true,
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    login: (state, action) => {
      state.user = {
        id: "u-usr",
        username: action.payload.username,
        email: action.payload.email,
      };
      state.role = action.payload.role;
      state.token = "jwt-mocked-token-string";
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.role = UserRole.SCORER;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setRole, login, logout } = authPlaceholderSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authPlaceholderSlice.reducer,
    match: matchReducer,
  },
});

export default store;
