import React from 'react'
import AdminHeader from '../Admin/Layout/AdminHeader';
import AdminSidebar from '../Admin/Layout/AdminSidebar';
import AllEvents from './AllEvents';

const AdminDashboardEvents = () => {
  return (
    <div>
        <AdminHeader/>
        <div className='w-full flex gap-[10px]'>
            <div className='w-[80px] 800px:w-[330px]'>
                <AdminSidebar active={6}/>
            </div>
            <AllEvents/>
        </div>
    </div>
  )
}

export default AdminDashboardEvents;