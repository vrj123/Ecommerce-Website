import React from "react";
import DashboardHeader from "./Layout/DashboardHeader";
import DashboardSidebar from "./Layout/DashboardSidebar";
import AllRefundOrders from "./AllRefundOrders";

const ShopAllRefund = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex ietms-center justify-between w-full mt-[80px]">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={10} />
        </div>
        <div className="overflow-y-scroll h-[86vh] w-full flex justify-center">
          <AllRefundOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefund;
