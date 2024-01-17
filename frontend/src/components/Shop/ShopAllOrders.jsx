import React from 'react'
import AllOrders from './AllOrders';
import DashboardHeader from './Layout/DashboardHeader';
import DashboardSidebar from './Layout/DashboardSidebar';

const ShopAllOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex ietms-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={2} />
        </div>
        <div className="w-full justify-center flex">
                <AllOrders />
        </div>
      </div>
    </div>
  )
}

export default ShopAllOrders;