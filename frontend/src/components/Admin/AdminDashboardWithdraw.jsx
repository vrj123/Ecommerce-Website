import React from 'react'
import AdminHeader from '../Admin/Layout/AdminHeader';
import AdminSidebar from '../Admin/Layout/AdminSidebar';
import AllWithdraws from './AllWithdraws';

const AdminDashboardWithdraw = () => {
  return (
    <div>
        <AdminHeader/>
        <div className='w-full flex gap-[10px]'>
            <div className='w-[80px] 800px:w-[330px]'>
                <AdminSidebar active={7}/>
            </div>
            <AllWithdraws/>
        </div>
    </div>
  )
}

export default AdminDashboardWithdraw;