import React from 'react'
import AdminDashboardMain from '../components/Admin/AdminDashboardMain';
import AdminHeader from '../components/Admin/Layout/AdminHeader';
import AdminSidebar from '../components/Admin/Layout/AdminSidebar';

const AdminDashboardPage = () => {
  return (
    <div>
        <AdminHeader/>
        <div className='w-full flex'>
            <div className='w-[80px] 800px:w-[330px]'>
                <AdminSidebar active={1}/>
            </div>
            <AdminDashboardMain/>
        </div>
    </div>
  )
}

export default AdminDashboardPage;