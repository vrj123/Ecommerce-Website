import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import ProductDetail from '../components/Product/ProductDetail';
import { productData } from '../static/data';
import SuggestedProduct from '../components/Product/SuggestedProduct';
import { useSelector } from 'react-redux';

const ProductDetailsPage = () => {
  const {id}=useParams();
  const [data, setData]=useState(null);
  const {allProducts}=useSelector((state)=>state.product);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const {allEvents}=useSelector((state)=>state.event);

  useEffect(()=>{
    if(eventData){
      const d=allEvents?.find((i)=>i._id===id)
      setData(d);
    }
    else{
      const d=allProducts?.find((i)=>i._id===id);
      setData(d);
    }
  }, [id, allProducts])
  return (
    <div>
        <Header/>
        <ProductDetail data={data}/>
        {
          data && <SuggestedProduct data={data}/> 
        }
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage;