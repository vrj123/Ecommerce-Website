import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Footer from "../components/Layout/Footer";

const ProductsPage = () => {
  const [searchParam] = useSearchParams();
  const categoryData = searchParam.get("category");
  const [data, setData] = useState([]);


  useEffect(() => {
    if (categoryData == null) {
      setData(productData);
    } else {
      const d = productData.filter((i) => i.category == categoryData);
      setData(d);
    }
  }, []);
  return (
    <>
      <Header />
      <div className={`${styles.section} mt-[40px]`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {data &&
            data.map((i, index) => {
              return <ProductCard data={i} key={index} />;
            })}
        </div>
        {data && data.length === 0 && (
          <div>
            <h1 className="font-bold text-[30px] text-center mb-[30px]">
              No products found
            </h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
