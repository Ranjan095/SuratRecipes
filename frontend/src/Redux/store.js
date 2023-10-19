/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

let store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;
