import React from 'react';
import AllProducts from './Layout/AllProducts';
import DashboardHeader from './Layout/DashboardHeader';
import DashboardSidebar from './Layout/DashboardSidebar';

const ShopAllProducts = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex ietms-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSidebar active={3} />
        </div>
        <div className="w-full justify-center flex">
                <AllProducts />
        </div>
      </div>
    </div>
  )
}

export default ShopAllProducts;