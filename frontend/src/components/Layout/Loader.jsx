import React from "react";
import Lottie from "lottie-react";
import animationData from "../../Assests/Animation/Animation - 1704259034496.json";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Lottie animationData={animationData} loop={true}/>
    </div>
  );
};

export default Loader;