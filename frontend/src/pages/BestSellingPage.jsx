import React, {useEffect, useState} from 'react';
import { productData } from '../static/data';
import styles from '../styles/styles';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import { useSelector } from 'react-redux';

const BestSellingPage = () => {
    const [data, setData]=useState([]);
    const {allProducts}=useSelector((state)=>state.product);
  useEffect(() => {
    const allProductsData=allProducts ? [...allProducts]:[];
    const d =
      allProductsData &&
      allProductsData.sort((a, b) => b.total_sell - a.total_sell).slice(0, 10);
    setData(d);
  }, [allProducts]);
  return (
    <div>
        <Header/>
        <div className={`${styles.section} mt-[40px] mb-12`}>
        <div className='flex flex-wrap justify-center gap-[20px] md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {
                    data && data.map((i, index)=>{
                        return <ProductCard data={i} key={index}/>
                    })
                }
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default BestSellingPage;