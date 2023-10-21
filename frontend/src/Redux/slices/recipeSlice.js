/** @format */

import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../assets/URL/BaseURL";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../utils/toast";

/** API call For getRecipesData item to user */
export let getRecipesData = createAsyncThunk("getRecipesData", async (url) => {
  try {
    let res = await axios.get(url);
    // console.log(res);

    return res.data;
  } catch (error) {
    console.log(error);
    TOAST_ERROR(error.response.data.message);
  }
});

/** API call For addFavorite item to user */
export let addFavorite = createAsyncThunk("addFavorite", async (data) => {
  try {
    // console.log(data);
    let res = await axios.post(
      `${baseURL}/recipes/addFavorite`,
      { productId: data.productId },
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    // console.log(res);
    TOAST_SUCCESS("added to your favorites list");
    return res.data;
  } catch (error) {
    // TOAST_ERROR("somting went wrong");
    TOAST_ERROR(error.response.data.message);
    console.log(error);
  }
});
/** API call For removeFavorite item from User */
export let removeFavorite = createAsyncThunk("removeFavorite", async (data) => {
  try {
    let res = await axios.post(`${baseURL}/recipes/removeFavorite`, data);
    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

let initialState = {
  isLoading: false,
  isFavLoading: false,
  isError: false,
  data: [],
};

let recipeSlice = createSlice({
  name: "recipe",
  initialState,
  extraReducers: (builder) => {
    /** for getRecipesData item */
    builder.addCase(getRecipesData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getRecipesData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getRecipesData.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    /** for addFavourite item */
    builder.addCase(addFavorite.pending, (state, action) => {
      state.isFavLoading = true;
    });
    builder.addCase(addFavorite.fulfilled, (state, action) => {
      //   TOAST_SUCCESS("added to your favorites list");
      state.isFavLoading = false;
    });
    builder.addCase(addFavorite.rejected, (state, action) => {
      state.isFavLoading = false;
      state.isError = true;
    });
    /** for removeFavourite item */
    builder.addCase(removeFavorite.pending, (state, action) => {
      state.isFavLoading = true;
    });
    builder.addCase(removeFavorite.fulfilled, (state, action) => {
      state.isFavLoading = false;
    });
    builder.addCase(removeFavorite.rejected, (state, action) => {
      state.isFavLoading = false;
      state.isError = true;
    });
  },
});

export default recipeSlice.reducer;
