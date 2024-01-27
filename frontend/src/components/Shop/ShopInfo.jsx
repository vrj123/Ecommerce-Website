import React, { useEffect, useState } from "react";
import { local_server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import Loader from "../Layout/Loader";
import {Link} from 'react-router-dom';

const ShopInfo = ({ isOwner }) => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const {allProducts}=useSelector((state)=>state.product);

  useEffect(() => {
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [id]);

  const handleLogout = () => {
    axios.get(`${server}/shop/logout`, { withCredentials: true }).then(() => {
      window.location.reload();
    });
  };

  const shopProducts=allProducts && allProducts.filter((product)=>product.shopId===id);
  let totalReviews=shopProducts && shopProducts.reduce((acc, product)=>acc+product.reviews.length, 0);
  const totalRatings=shopProducts && shopProducts.reduce((acc, product)=>acc+ product.reviews.reduce((sum, review)=>sum+review.rating, 0), 0);
  const avg=totalRatings / totalReviews || 0;
  const avgRating = avg.toFixed(2);


  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img
                src={`${data?.avatar?.url}`}
                alt=""
                className="w-[150px] h-[150px] rounded-full"
              />
            </div>
            <h5 className="text-center text-[20px] py-2">{data?.name}</h5>
            <p className="p-[10px] flex items-center text-[#000000a6]">
              {data?.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="fonr-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data?.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="fonr-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="fonr-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{shopProducts?.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="fonr-[600]">Shop rating</h5>
            <h4 className="text-[#000000a6]">{avgRating}</h4>
          </div>
          <div className="p-3">
            <h5 className="fonr-[600]">Joined on</h5>
            <h4 className="text-[#000000a6]">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full text-white text-[18px]`}
                >
                  Edit Shop
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full text-white text-[18px]`}
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
