import {createReducer} from '@reduxjs/toolkit';

const initialState={
    isLoading:true,
}

export const productReducer=createReducer(initialState, (builder)=>{
    builder.addCase('productCreateRequest',(state)=>{
        state.isLoading=true;
    })
    .addCase('productCreateSuccess',(state, action)=>{
        state.success=true;
        state.isLoading=false;
        state.product=action.payload;
    })
    .addCase('productCreateFail', (state, action)=>{
        state.success=false;
        state.error=action.payload;
        state.isLoading=false;
    })
    .addCase('cleanError',(state)=>{
        state.error=null
    })
    .addCase('getShopProductsRequest', (state)=>{
        state.isLoading=true;
    })
    .addCase('getShopProductsSuccess', (state, action)=>{
        state.isLoading=false;
        state.products=action.payload;
    })
    .addCase('getShopProductsFail', (state, action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    .addCase('deleteProductRequest', (state)=>{
        state.isLoading=true;
    })
    .addCase('deleteProductSuccess', (state, action)=>{
        state.isLoading=false;
        state.massage=action.payload;
    })
    .addCase('deleteProductFail', (state, action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    .addCase('getAllProductsRequest', (state)=>{
        state.isLoading=true;
    })
    .addCase('getAllProductsSuccess', (state, action)=>{
        state.isLoading=false;
        state.allProducts=action.payload;
    })
    .addCase('getAllProductsFail', (state, action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
})