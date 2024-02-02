import React from "react";
import DashboardMessages from "../../components/Shop/DashboardMessages";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full mt-[80px]">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={8} />
        </div>
        <div className="overflow-y-scroll h-[86vh] w-full flex justify-center">
          <DashboardMessages />
        </div>
      </div>
    </div>
  );
};

export default ShopInboxPage;
