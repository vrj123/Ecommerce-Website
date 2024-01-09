import axios from "axios";
import { server } from "../../server";


export const loadUser=()=>async(dispatch)=>{
    try{
        dispatch({
            type:"LoadUserRequest"
        })
        const {data}=await axios.get(`${server}/user/getuser`, {withCredentials:true});
        dispatch({
            type:"LoadUserSuccess",
            payload:data.user
        })
        
    }
    catch(error){
        dispatch({
            type:"LoadUserFail",
            payload:error.response.data.message,
        })
    }
}

export const updateUserInformation=(email, phoneNumber, password, name)=>async(dispatch)=>{
    try{
        dispatch({
            type:'updateUserInfoRequest',
        })

        const {data}= await axios.put(`${server}/user/update-user-info`, {
            email,
            phoneNumber,
            password,
            name
        }, {withCredentials:true})

        dispatch({
            type:"updateUserInfoSuccess",
            payload:data.user,
        })
    }
    catch(error){
        dispatch({
            type:'updateUserInfoFail',
            payload:error.response.data.message,
        })
    }
}


export const updateUserAddress=(addressData)=>async(dispatch)=>{
    try{
        dispatch({
            type:'updateUserAddressRequest',
        })

        const {data}=await axios.put(`${server}/user/update-user-addresses`, addressData, {withCredentials:true});
        dispatch({
            type:'updateUserAddressSuccess',
            payload:{
                user:data.user,
                message:"Address updated successfully",
            },
        })
    }
    catch(error){
        dispatch({
            type:'updateUserAddressFail',
            payload:error.response.data.message,
        })
    }
}

export const deleteUserAddress=(id)=>async(dispatch)=>{
    try{

        dispatch({
            type:'deleteUserAddressRequest',
        })

        const {data}=await axios.delete(`${server}/user/delete-user-address/${id}`,  {withCredentials:true});
        dispatch({
            type:'deleteUserAddressSuccess',
            payload:{
                user:data.user,
                message:'Address deleted successfully',
            }
        })
    }
    catch(error){
        dispatch({
            type:'deleteUserAddressFail',
            payload:error.response.data.message,
        })
    }
}