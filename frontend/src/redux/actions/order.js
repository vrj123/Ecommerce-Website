import axios from "axios"
import { server } from "../../server"




export const getAllUserOrders=(userId)=>async(dispatch)=>{

    try{
        dispatch({
            type:'getUserOrdersRequest'
        })

        const {data}=await axios.get(`${server}/order/get-all-orders/${userId}`);
        dispatch({
            type:'getUserOrdersSuccess',
            payload:data.orders,
        })
    }
    catch(error){
        dispatch({
            type:'getUserOrdersFail',
            payload:error.response.data.message
        })
    }

}

export const getAllShopOrders=(shopId)=>async(dispatch)=>{

    try{
        dispatch({
            type:'getUserOrdersRequest'
        })

        const {data}=await axios.get(`${server}/order/get-shop-all-orders/${shopId}`);
        dispatch({
            type:'getUserOrdersSuccess',
            payload:data.orders,
        })
    }
    catch(error){
        dispatch({
            type:'getUserOrdersFail',
            payload:error.response.data.message
        })
    }

}

export const getAllAdminOrders=()=>async(dispatch)=>{

    try{
        dispatch({
            type:'getAdminOrdersRequest'
        })

        const {data}=await axios.get(`${server}/order/get-admin-all-orders`, {withCredentials:true});
        dispatch({
            type:'getAdminOrdersSuccess',
            payload:data.orders,
        })
    }
    catch(error){
        dispatch({
            type:'getAdminOrdersFail',
            payload:error.response.data.message
        })
    }

}