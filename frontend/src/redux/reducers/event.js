import {createReducer} from '@reduxjs/toolkit';

const initialState={
    isLoading:true,
}

export const eventReducer=createReducer(initialState, (builder)=>{
    builder.addCase('eventCreateRequest',(state)=>{
        state.isLoading=true;
    })
    .addCase('eventCreateSuccess',(state, action)=>{
        state.success=true;
        state.isLoading=false;
        state.event=action.payload;
    })
    .addCase('eventCreateFail', (state, action)=>{
        state.success=false;
        state.error=action.payload;
        state.isLoading=false;
    })
    .addCase('cleanError',(state)=>{
        state.error=null
    })
    .addCase('getShopEventsRequest', (state)=>{
        state.isLoading=true;
    })
    .addCase('getShopEventsSuccess', (state, action)=>{
        state.isLoading=false;
        state.events=action.payload;
    })
    .addCase('getShopEventsFail', (state, action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    .addCase('deleteEventRequest', (state)=>{
        state.isLoading=true;
    })
    .addCase('deleteEventSuccess', (state, action)=>{
        state.isLoading=false;
        state.massage=action.payload;
    })
    .addCase('deleteEventFail', (state, action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
    .addCase('getAllEventsRequest', (state)=>{
        state.isLoading=true;
    })
    .addCase('getAllEventsSuccess', (state, action)=>{
        state.isLoading=false;
        state.allEvents=action.payload;
    })
    .addCase('getAllEventsFail', (state, action)=>{
        state.isLoading=false;
        state.error=action.payload;
    })
})