import { createReducer } from "@reduxjs/toolkit";

const initialState={
    isLoading:true,
};

export const sellerReducer=createReducer(initialState, (builder)=>{
    builder.addCase('LoadSellerRequest',(state)=>{
        state.isLoading=true;
    })
    .addCase('LoadSellerSuccess',(state, action)=>{
        state.isSeller=true;
        state.isLoading=false;
        state.seller=action.payload;
    })
    .addCase('LoadSellerFail', (state, action)=>{
        state.isSeller=false;
        state.error=action.payload;
        state.isLoading=false;
    })
    .addCase('cleanError',(state)=>{
        state.error=null
    })
})