import React, {useEffect, useState} from 'react';
import { productData } from '../static/data';
import styles from '../styles/styles';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import ProductCard from '../components/Route/ProductCard/ProductCard';

const BestSellingPage = () => {
    const [data, setData]=useState([]);
    useEffect(()=>{
        const d=productData && productData.sort((a,b)=>b.total_sell-a.total_sell).slice(0, 10);
        setData(d);
    });
  return (
    <div>
        <Header/>
        <div className={`${styles.section} mt-[40px]`}>
        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0'>
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