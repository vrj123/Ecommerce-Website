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
    .addCase('getAdminSellersRequest', (state)=>{
        state.isLoading=true;
    })
    .addCase('getAdminSellersSuccess', (state, action)=>{
        state.isLoading=false;
        state.AdminSellers=action.payload;
    })
    .addCase('getAdminSellersFail', (state, action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    .addCase('cleanError',(state)=>{
        state.error=null
    })
})