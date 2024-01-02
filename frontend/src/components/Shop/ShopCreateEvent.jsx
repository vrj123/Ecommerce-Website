import React from "react";
import DashboardHeader from './Layout/DashboardHeader';
import DashboardSidebar from './Layout/DashboardSidebar';
import CreateEvent from "./CreateEvent";

const ShopCreateProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex ietms-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={6} />
        </div>
        <div className="w-full flex justify-center">
            <CreateEvent/>
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
