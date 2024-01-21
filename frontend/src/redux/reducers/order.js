import {createReducer} from '@reduxjs/toolkit';

const initialState={
    isLoading:true,
}

export const orderReducer=createReducer(initialState, (builder)=>{
    builder.addCase('getUserOrdersRequest', (state)=>{
        state.isLoading=true;
    })
    .addCase('getUserOrdersSuccess', (state, action)=>{
        state.isLoading=false;
        state.orders=action.payload;
    })
    .addCase('getUserOrdersFail', (state, action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    .addCase('getShopOrdersRequest', (state)=>{
        state.isLoading=true;
    })
    .addCase('getShopOrdersSuccess', (state, action)=>{
        state.isLoading=false;
        state.orders=action.payload;
    })
    .addCase('getShopOrdersFail', (state, action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    .addCase('getAdminOrdersRequest', (state)=>{
        state.isLoading=true;
    })
    .addCase('getAdminOrdersSuccess', (state, action)=>{
        state.isLoading=false;
        state.AdminOrders=action.payload;
    })
    .addCase('getAdminOrdersFail', (state, action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    .addCase('cleanError',(state)=>{
        state.error=null
    })
})