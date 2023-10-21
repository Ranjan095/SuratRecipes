/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import recipeSlice from "./slices/recipeSlice";

let store = configureStore({
  reducer: {
    user: userSlice,
    recipes: recipeSlice,
  },
});

export default store;
