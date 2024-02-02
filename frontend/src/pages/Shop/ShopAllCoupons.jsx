import React, { useState } from "react";
import AllCouponCodes from "../../components/Shop/AllCouponCodes";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";

const ShopAllCoupons = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <DashboardHeader />
      <div className="flex ietms-center justify-between w-full mt-[80px]">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={9} />
        </div>
        <div className="overflow-y-scroll h-[86vh] w-full flex justify-center">
          <AllCouponCodes />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupons;
