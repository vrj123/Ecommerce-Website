import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getShopAllProducts } from "../../redux/actions/product";
import ProductCard from "../Route/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { getShopAllEvents } from "../../redux/actions/event";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { id } = useParams();
  const {events}=useSelector((state)=>state.event);

  useEffect(() => {
    dispatch(getShopAllProducts(id));
    dispatch(getShopAllEvents(id));
  }, [dispatch, id]);

  console.log(events);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="w-full flex items-center">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`text-[20px] font-[600] ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`text-[20px] font-[600] ${
                active === 2 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`text-[20px] font-[600] ${
                active === 3 ? "text-red-500" : "text-[#333]"
              } cursor-pointer pr-[20px]`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>
        {isOwner && (
          <div>
            <Link
              to="/dashboard"
              className="bg-[#000] text-white py-2 px-4 rounded-sm"
            >
              <span>Dashboard</span>
            </Link>
          </div>
        )}
      </div>

      {active===1 &&
        (products && products.length === 0 ? (
          <div className="flex h-[80vh] items-center justify-center text-[20px] font-[600] mt-10">
            No Products found
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-[20px] md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
            {products &&
              products.map((i, index) => {
                return <ProductCard data={i} key={index} />;
              })}
          </div>
        ))}


        {active===2 &&
        (events && events.length === 0 ? (
          <div className="flex h-[80vh] items-center justify-center text-[20px] font-[600] mt-10">
            No Events found
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-[20px] md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-10">
            {events &&
              events.map((i, index) => {
                return <ProductCard data={i} key={index} />;
              })}
          </div>
        ))}

    </div>
  );
};

export default ShopProfileData;
