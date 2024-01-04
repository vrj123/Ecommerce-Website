import React from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from '../ProductCard/ProductCard';


const FeaturedProducts = () => {
  const { allProducts } = useSelector((state) => state.product);
  console.log(allProducts);

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.heading}`}>
        <h1>Featured Products</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-[20px] md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {allProducts && allProducts.length !== 0 ? (
          allProducts.map((i, index) => {
            return <ProductCard data={i} key={index} />;
          })
        ) : (
          <div>No Products found</div>
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
