import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading:true,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })
    .addCase('updateUserInfoRequest', (state)=>{
      state.loading=true;
    })
    .addCase('updateUserInfoSuccess', (state, action)=>{
      state.loading=false;
      state.user=action.payload;
    })
    .addCase('updateUserInfoFail', (state, action)=>{
      state.loading=false;
      state.error=action.payload;
    })
    .addCase('updateUserAddressRequest', (state)=>{
      state.addressloading=true;
    })
    .addCase('updateUserAddressSuccess', (state, action)=>{
      state.addressloading=false;
      state.user=action.payload.user;
      state.addressUpdateMessage=action.payload.message;
    })
    .addCase('updateUserAddressFail', (state, action)=>{
      state.addressloading=false;
      state.error=action.payload;
    })
    .addCase('cleanAddressUpdateMessage', (state)=>{
      state.addressUpdateMessage="";
    })
    .addCase('deleteUserAddressRequest', (state)=>{
      state.addressloading=true;
    })
    .addCase('deleteUserAddressSuccess', (state, action)=>{
      state.addressloading=false;
      state.user=action.payload.user;
      state.deleteUserAddressMessage=action.payload.message;
    })
    .addCase('deleteUserAddressFail', (state, action)=>{
      state.addressloading=false;
      state.error=action.payload;
    })
    .addCase('cleanDeleteUserAddressMessage', (state)=>{
      state.deleteUserAddressMessage="";
    })
    .addCase("cleanError", (state) => {
      state.error = null;
    });
});
