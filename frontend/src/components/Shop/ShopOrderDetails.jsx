import React from "react";
import DashboardHeader from "./Layout/DashboardHeader";
import DashboardSidebar from "./Layout/DashboardSidebar";
import OrderDetails from "./OrderDetails";

const ShopOrderDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex ietms-center justify-between w-full mt-[80px]">
        <div className="overflow-y-scroll h-[87vh] w-full flex justify-center">
          <OrderDetails />
        </div>
      </div>
    </div>
  );
};

export default ShopOrderDetails;
