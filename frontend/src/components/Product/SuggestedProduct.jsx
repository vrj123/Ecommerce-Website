import React, { useEffect, useState } from 'react'
import ProductCard from '../Route/ProductCard/ProductCard';
import styles from '../../styles/styles';
import { useSelector } from 'react-redux';

const SuggestedProduct = ({data}) => {

    const [products, setProducts]=useState(null);
    const {allProducts}=useSelector((state)=>state.product);

    useEffect(()=>{
       const d= allProducts && allProducts.filter((i)=>i.category===data.category);
        setProducts(d);
    }, [allProducts])


  return (
    <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
            <h1>Related Products</h1>
        </div>
        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0'>
                {
                    products && products.map((i, index)=>{
                        return <ProductCard data={i} key={index}/>
                    })
                }
          </div>
    </div>
  )
}

export default SuggestedProduct;