import React from 'react'
import AdminDashboardMain from '../components/Admin/AdminDashboardMain';
import AdminHeader from '../components/Admin/Layout/AdminHeader';
import AdminSidebar from '../components/Admin/Layout/AdminSidebar';

const AdminDashboardPage = () => {
  return (
    <div>
        <AdminHeader/>
        <div className='flex ietms-center justify-between w-full mt-[80px]'>
            <div className='w-[80px] 800px:w-[330px]'>
                <AdminSidebar active={1}/>
            </div>
            <div className="overflow-y-scroll h-[86vh] w-full flex justify-center">
            <AdminDashboardMain/>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboardPage;