import React from 'react'
import AdminHeader from '../Admin/Layout/AdminHeader';
import AllUsers from './AllUsers';
import AdminSidebar from '../Admin/Layout/AdminSidebar';

const AdminDashboardUsers = () => {
  return (
    <div>
        <AdminHeader/>
        <div className='w-full flex gap-[10px]'>
            <div className='w-[80px] 800px:w-[330px]'>
                <AdminSidebar active={4}/>
            </div>
            <AllUsers/>
        </div>
    </div>
  )
}

export default AdminDashboardUsers;