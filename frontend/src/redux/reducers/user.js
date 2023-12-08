import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAUthenticated: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAUthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAUthenticated = false;
    })
    .addCase("cleanError", (state) => {
      state.error = null;
    });
});
