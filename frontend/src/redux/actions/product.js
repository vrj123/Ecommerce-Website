import axios from "axios";
import { server } from "../../server";

export const createProduct = (productData) => async(dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });


    const { data } = await axios.post(
      `${server}/product/create-product`,
      productData,
    );
    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response?.data?.message,
    });
  }
};


export const getShopAllProducts=(id)=>async(dispatch)=>{
  try{
    dispatch({
      type:"getShopProductsRequest",
    })

    const {data}=await axios.get(`${server}/product/get-all-products-shop/${id}`);
    dispatch({
      type:"getShopProductsSuccess",
      payload:data.products,
    })
  }
  catch(error){
    dispatch({
      type:"getShopProductsFail",
      payload:error.response.data.message,
    })
  }
}


export const deleteProduct=(id)=>async(dispatch)=>{
  try{
    dispatch({
      type:"deleteProductRequest",
    })
    const {data}=await axios.delete(`${server}/product/delete-shop-product/${id}`, {withCredentials:true});
    dispatch({
      type:"deleteProductSuccess",
      payload:data.message,
    })
  }
  catch(error){
    dispatch({
      type:"deleteProductFail",
      payload:error.response.data.message,
    })
  }
}

export const getAllProducts=()=>async(dispatch)=>{
  try{
    dispatch({
      type:"getAllProductsRequest"
    })

    const {data}=await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type:"getAllProductsSuccess",
      payload:data.products
    })
  }
  catch(error){
    dispatch({
      type:"getAllProductsFail",
      payload:error.response.data.message
    })
  }
}
