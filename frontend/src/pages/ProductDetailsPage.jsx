import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import ProductDetail from '../components/Product/ProductDetail';
import { productData } from '../static/data';

const ProductDetailsPage = () => {
    const {name}=useParams();
    const [data, setData]=useState(null);
    const product_name=name.replace(/-/g, " ");

    useEffect(()=>{
        const d=productData.find((i)=>i.name===product_name);
        setData(d);
    }, [product_name])
  return (
    <div>
        <Header/>
        <ProductDetail data={data}/>
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage;