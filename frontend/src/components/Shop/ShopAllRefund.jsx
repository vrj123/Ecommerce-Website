import React from 'react'
import DashboardHeader from './Layout/DashboardHeader';
import DashboardSidebar from './Layout/DashboardSidebar';
import AllRefundOrders from './AllRefundOrders';

const ShopAllRefund = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex ietms-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={10} />
        </div>
        <div className="w-full justify-center flex">
                <AllRefundOrders />
        </div>
      </div>
    </div>
  )
}

export default ShopAllRefund;