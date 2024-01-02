import React from 'react';
import AllEvents from './AllEvents';
import AllProducts from './Layout/AllProducts';
import DashboardHeader from './Layout/DashboardHeader';
import DashboardSidebar from './Layout/DashboardSidebar';

const ShopAllEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex ietms-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={5} />
        </div>
        <div className="w-full justify-center flex">
            <AllEvents/>
        </div>
      </div>
    </div>
  )
}

export default ShopAllEvents;