import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { productData } from "../../../static/data";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  let { allProducts, isLoading } = useSelector((state) => state.product);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const d =
      allProductsData &&
      allProductsData.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = d?.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);
  return (
      <div className={`${styles.section} mb-12`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center gap-[20px] md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data && data.length !== 0 ? (
            data.map((i, index) => {
              return <ProductCard data={i} key={index} />;
            })
          ) : (
            <div className="text-center">No Products found</div>
          )}
        </div>
      )}
      </div>
  );
};

export default BestDeals;
