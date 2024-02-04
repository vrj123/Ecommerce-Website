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
        <div className='flex flex-wrap justify-center gap-[20px] md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
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