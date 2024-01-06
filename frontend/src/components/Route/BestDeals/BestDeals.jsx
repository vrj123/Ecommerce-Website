import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  let {allProducts}=useSelector((state)=>state.product);
  useEffect(() => {
    const allProductsData=allProducts?[...allProducts]:[];
    const d = allProductsData && allProductsData.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = d?.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);
  return (
    <div>
      <div className={`${styles.section} mb-12`}>
          <div className={`${styles.heading}`}>
                <h1>Best Deals</h1>
          </div>
          <div className='flex flex-wrap justify-center gap-[20px] md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {
                    data && data.map((i, index)=>{
                        return <ProductCard data={i} key={index}/>
                    })
                }
          </div>
      </div>
    </div>
  );
};

export default BestDeals;
