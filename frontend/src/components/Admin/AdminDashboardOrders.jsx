import React from 'react'
import AdminHeader from '../Admin/Layout/AdminHeader';
import AdminSidebar from '../Admin/Layout/AdminSidebar';
import AllOrders from './AllOrders';

const AdminDashboardOrders = () => {
  return (
    <div>
        <AdminHeader/>
        <div className='w-full flex gap-[10px]'>
            <div className='w-[80px] 800px:w-[330px]'>
                <AdminSidebar active={2}/>
            </div>
            <AllOrders/>
        </div>
    </div>
  )
}

export default AdminDashboardOrders;