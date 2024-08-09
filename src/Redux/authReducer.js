import { createSlice } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("auth_token"));

//Initial State Object
const initialState = {
  isAuthenticated: token ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signin: (state, payload) => {
      state.isAuthenticated = true;
    },
    signout: (state, payload) => {
      state.isAuthenticated = false;
    },
  },
  // extraReducers: {},
});

export const authReducer = authSlice.reducer;
export const authSelector = (state) => state.authReducer;
export const { signin, signout } = authSlice.actions;
