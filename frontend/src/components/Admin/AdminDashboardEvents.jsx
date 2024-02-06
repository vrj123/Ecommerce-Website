import React from "react";
import AdminHeader from "../Admin/Layout/AdminHeader";
import AdminSidebar from "../Admin/Layout/AdminSidebar";
import AllEvents from "./AllEvents";

const AdminDashboardEvents = () => {
  return (
    <div>
      <AdminHeader />
      <div className="flex ietms-center justify-between w-full mt-[80px]">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSidebar active={6} />
        </div>
        <div className="overflow-y-scroll h-[86vh] w-full flex justify-center">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardEvents;
