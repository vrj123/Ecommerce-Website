import React from 'react'
import AdminHeader from '../Admin/Layout/AdminHeader';
import AdminSidebar from '../Admin/Layout/AdminSidebar';
import AllOrders from './AllOrders';

const AdminDashboardOrders = () => {
  return (
    <div>
        <AdminHeader/>
        <div className='flex ietms-center justify-between w-full mt-[80px]'>
            <div className='w-[80px] 800px:w-[330px]'>
                <AdminSidebar active={2}/>
            </div>
            <div className="overflow-y-scroll h-[86vh] w-full flex justify-center">
            <AllOrders/>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboardOrders;