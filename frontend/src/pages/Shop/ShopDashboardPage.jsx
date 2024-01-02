import React, { useState } from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";

const ShopDashboardPage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <DashboardHeader />
      <div className="flex ietms-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={active} />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
