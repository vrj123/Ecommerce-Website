import axios from "axios";
import { server } from "../../server";

export const createEvent = (formData) => async(dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/event/create-event`,
      formData,
      config
    );
    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response?.data?.message,
    });
  }
};


export const getShopAllEvents=(id)=>async(dispatch)=>{
  try{
    dispatch({
      type:"getShopEventsRequest",
    })

    const {data}=await axios.get(`${server}/event/get-all-events-shop/${id}`);
    dispatch({
      type:"getShopEventsSuccess",
      payload:data.events,
    })
  }
  catch(error){
    dispatch({
      type:"getShopEventsFail",
      payload:error.response.data.message,
    })
  }
}


export const deleteEvent=(id)=>async(dispatch)=>{
  try{
    dispatch({
      type:"deleteEventRequest",
    })
    const {data}=await axios.delete(`${server}/event/delete-shop-event/${id}`, {withCredentials:true});
    dispatch({
      type:"deleteEventSuccess",
      payload:data.message,
    })
  }
  catch(error){
    dispatch({
      type:"deleteEventFail",
      payload:error.response.data.message,
    })
  }
}

export const getAllEvents=()=>async(dispatch)=>{
  try{
    dispatch({
      type:'getAllEventsRequest',
    })
    const {data}=await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type:'getAllEventsSuccess',
      payload:data.events,
    })
  }
  catch(error){
    dispatch({
      type:'getAllEventsFail',
      payload:error.response.data.message,
    })
  }
}
