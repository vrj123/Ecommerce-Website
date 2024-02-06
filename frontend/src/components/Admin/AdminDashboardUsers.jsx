import React from "react";
import AdminHeader from "../Admin/Layout/AdminHeader";
import AllUsers from "./AllUsers";
import AdminSidebar from "../Admin/Layout/AdminSidebar";

const AdminDashboardUsers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex ietms-center justify-between w-full mt-[80px]">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={4} />
        </div>
        <div className="overflow-y-scroll h-[86vh] w-full flex justify-center">
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsers;
