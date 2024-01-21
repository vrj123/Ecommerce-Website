import axios from "axios";
import { server } from "../../server";


export const loadSeller=()=>async(dispatch)=>{
    try{
        dispatch({
            type:"LoadSellerRequest"
        })
        const {data}=await axios.get(`${server}/shop/getSeller`, {withCredentials:true});
        console.log(data);
        dispatch({
            type:"LoadSellerSuccess",
            payload:data.seller
        })
        
    }
    catch(error){
        console.log(error);
        dispatch({
            type:"LoadSellerFail",
            payload:error.response?.data?.message,
        })
    }
}

export const getAllAdminSellers=()=>async(dispatch)=>{

    try{
        dispatch({
            type:'getAdminSellersRequest'
        })

        const {data}=await axios.get(`${server}/shop/get-admin-all-shops`, {withCredentials:true});
        dispatch({
            type:'getAdminSellersSuccess',
            payload:data.sellers,
        })
    }
    catch(error){
        dispatch({
            type:'getAdminSellersFail',
            payload:error.response.data.message
        })
    }

}