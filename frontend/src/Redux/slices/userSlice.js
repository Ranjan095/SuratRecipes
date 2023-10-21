/** @format */

import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../assets/URL/BaseURL";
import { TOAST_ERROR, TOAST_SUCCESS } from "../../utils/toast";

/** API call For Signup user */
export let signUpUser = createAsyncThunk("signUpUser", async (data) => {
  try {
    let res = await axios.post(`${baseURL}/user/create`, data);
    // console.log(res);
    TOAST_SUCCESS(`your account has been created!`);
    return res.data;
  } catch (error) {
    console.log(error);
    TOAST_ERROR(error.response.data.message);
  }
});

/** API call For Login User */
export let loginUser = createAsyncThunk("loginUser", async (data) => {
  try {
    let res = await axios.post(`${baseURL}/user/login`, data);
    // console.log(res);
    TOAST_SUCCESS(`login successful!`);
    return res.data;
  } catch (error) {
    console.log(error);
    TOAST_ERROR(error.response.data.message);
  }
});

let initialState = {
  isLoading: false,
  isError: false,
  token: sessionStorage.getItem("token") || "",
  userName: sessionStorage.getItem("userName") || "",
};

let userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token = "";
      sessionStorage.removeItem("token");
      state.userName = "";
      sessionStorage.removeItem("userName");
      TOAST_SUCCESS("Logout successful");
    },
  },
  extraReducers: (builder) => {
    /** For Signup user */
    builder.addCase(signUpUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    /** For Login User */
    builder.addCase(loginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token;
      sessionStorage.setItem("token", action.payload.token);
      state.userName = action.payload.userName;
      sessionStorage.setItem("userName", action.payload.userName);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
// console.log(userSlice.actions);

export const { logout } = userSlice.actions;

export default userSlice.reducer;
