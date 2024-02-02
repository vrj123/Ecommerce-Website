import React from "react";
import AllProducts from "./Layout/AllProducts";
import DashboardHeader from "./Layout/DashboardHeader";
import DashboardSidebar from "./Layout/DashboardSidebar";

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex ietms-center justify-between w-full mt-[80px]">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={3} />
        </div>
        <div className="overflow-y-scroll h-[86vh] w-full flex justify-center">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProducts;
