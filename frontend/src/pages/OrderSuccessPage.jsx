import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import animationData from "../Assests/Animation/Animation - 1704256542507.json";
import Lottie from "lottie-react";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  return (
      <div className="flex flex-col justify-center items-center">
        <Lottie
          animationData={animationData}
          className="w-[200px]"
        />
        <h2 className="text-center mb-6 text-[20px] font-[600]">Order placed successfully</h2>
      </div>
  );
};

export default OrderSuccessPage;
