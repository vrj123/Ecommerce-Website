import React from 'react'
import AdminHeader from '../Admin/Layout/AdminHeader';
import AdminSidebar from '../Admin/Layout/AdminSidebar';
import AllSellers from './AllSellers';

const AdminDashboardSellers = () => {
  return (
    <div>
        <AdminHeader/>
        <div className='w-full flex gap-[10px]'>
            <div className='w-[80px] 800px:w-[330px]'>
                <AdminSidebar active={3}/>
            </div>
            <AllSellers/>
        </div>
    </div>
  )
}

export default AdminDashboardSellers;