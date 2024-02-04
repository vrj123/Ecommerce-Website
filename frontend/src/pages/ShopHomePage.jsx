import React from "react";
import ShopInfo from "../components/Shop/ShopInfo";
import ShopProfileData from "../components/Shop/ShopProfileData";
import styles from "../styles/styles";
import DashboardHeader from "../components/Shop/Layout/DashboardHeader";

const ShopHomePage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className={`${styles.section} bg-[#f5f5f5] mt-[80px]`}>
      <div className="w-full 800px:flex justify-between">
        <div className="800px:w-[20%] bg-[#fff] rounded-[4px] shadow-sm 800px:overflow-y-scroll 800px:h-[87vh] h-fit z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="800px:w-[78%] rounded-[4px] h-[87vh] overflow-y-scroll pt-2">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ShopHomePage;
