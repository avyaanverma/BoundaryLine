import { configureStore } from "@reduxjs/toolkit";
import matchReducer from "./features/scoreboard/store/mathSlice"

const store = configureStore({
  reducer: {
    match: matchReducer,
  },
});

export default store;