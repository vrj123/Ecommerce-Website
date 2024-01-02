import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import Loader from "../components/Layout/Loader";

const ShopProtectedRoute = ({ children }) => {
  const { isSeller, isLoading } = useSelector((state) => state.seller);

  if(isLoading){
    return <div>Loading...</div>
  }

  if (!isLoading) {
    if (!isSeller) {
      return <Navigate to="/shop-login" replace />;
    }
  }

  return children;
};

export default ShopProtectedRoute;
