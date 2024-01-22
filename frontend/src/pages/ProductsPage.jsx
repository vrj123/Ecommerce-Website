import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import Header from "../components/Layout/Header";
import styles from "../styles/styles";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const [searchParam] = useSearchParams();
  const categoryData = searchParam.get("category");
  const [data, setData] = useState([]);
  const {allProducts}=useSelector((state)=>state.product);


  useEffect(() => {
    if (categoryData == null) {
      setData(allProducts);
    } else {
      const category=categoryData.replace(/-/g, " ");
      const d = allProducts?.filter((i) => i.category == category);
      setData(d);
    }
  }, [categoryData, allProducts]);
  return (
    <>
      <Header />
      <div className={`${styles.section} mt-[40px] mb-12`}>
        {data && data.length === 0 ? (
          <div>
            <h1 className="font-bold text-[30px] text-center mb-[30px]">
              No products found
            </h1>
          </div>
        ):(
          <div className="flex flex-wrap justify-center gap-[20px] md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data &&
            data.map((i, index) => {
              return <ProductCard data={i} key={index} />;
            })}
        </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
