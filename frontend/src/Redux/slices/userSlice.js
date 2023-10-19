/** @format */

import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../assets/URL/BaseURL";
import { toast } from "react-toastify";

/** API call For Signup user */
export let signUpUser = createAsyncThunk("signUpUser", async (data) => {
  let res = await axios.post(`${baseURL}/user/create`, data);
  return res.data;
});

/** API call For Login User */
export let loginUser = createAsyncThunk("loginUser", async (data) => {
  try {
    let res = await axios.post(`${baseURL}/user/login`, data);
    // console.log(res);
    toast.success(`login successful!`, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    return res.data;
  } catch (error) {
    // console.lo(error.response.data.message);
    toast.error(error.response.data.message, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
});

let initialState = {
  isLoading: false,
  isError: false,
};

let userSlice = createSlice({
  name: "user",
  initialState,
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
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});
// console.log(userSlice.actions);

export default userSlice;
