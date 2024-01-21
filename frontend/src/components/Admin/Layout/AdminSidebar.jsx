import React from "react";
import {  FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import {CiMoneyBill} from 'react-icons/ci';
import {PiUsersThreeLight} from 'react-icons/pi'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";



const AdminSidebar = ({ active }) => {
  return (
    <div className="w-full h-[89vh] bg-white sticky left-0 top-[80px] overflow-y-scroll z-10 shadow-sm">
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin/dashboard"
          className="cursor-pointer w-full flex items-center"
        >
          <RxDashboard size={30} color={active === 1 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-orders"
          className="cursor-pointer w-full flex items-center"
        >
          <FiShoppingBag size={30} color={active === 2 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-sellers"
          className="cursor-pointer w-full flex items-center"
        >
          <GrWorkshop size={30} color={active === 3 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Sellers
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-users"
          className="cursor-pointer w-full flex items-center"
        >
          <PiUsersThreeLight size={30} color={active === 4 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-products"
          className="cursor-pointer w-full flex items-center"
        >
          <HiOutlineShoppingBag size={30} color={active === 5 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-events"
          className="cursor-pointer w-full flex items-center"
        >
          <MdOutlineLocalOffer size={30} color={active === 6 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin-withdraw-money"
          className="cursor-pointer w-full flex items-center"
        >
          <CiMoneyBill size={30} color={active === 7 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Request
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/profile"
          className="cursor-pointer w-full flex items-center"
        >
          <IoSettingsOutline size={30} color={active === 8 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
