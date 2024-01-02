import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import {VscNewFile} from 'react-icons/vsc';
import {CiMoneyBill, CiSettings} from 'react-icons/ci';
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSidebar = ({ active }) => {
  return (
    <div className="w-full h-[89vh] bg-white stiky left-0 top-0 overflow-y-scroll z-10 shadow-sm">
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard"
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
          to="/dashboard-orders"
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
          to="/dashboard-products"
          className="cursor-pointer w-full flex items-center"
        >
          <FiPackage size={30} color={active === 3 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-product"
          className="cursor-pointer w-full flex items-center"
        >
          <AiOutlineFolderAdd size={30} color={active === 4 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-events"
          className="cursor-pointer w-full flex items-center"
        >
          <MdOutlineLocalOffer size={30} color={active === 5 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-event"
          className="cursor-pointer w-full flex items-center"
        >
          <VscNewFile size={30} color={active === 6 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-withdraw-money"
          className="cursor-pointer w-full flex items-center"
        >
          <CiMoneyBill size={30} color={active === 7 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-messages"
          className="cursor-pointer w-full flex items-center"
        >
          <BiMessageSquareDetail size={30} color={active === 8 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-coupons"
          className="cursor-pointer w-full flex items-center"
        >
          <AiOutlineGift size={30} color={active === 9 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 9 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Coupons
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-refunds"
          className="cursor-pointer w-full flex items-center"
        >
          <HiOutlineReceiptRefund size={30} color={active === 10 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 10 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Refund
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-settings"
          className="cursor-pointer w-full flex items-center"
        >
          <CiSettings size={30} color={active === 11 ? "crimson" : "#555"} />
          <h5
            className={`pl-2 text-[18px] font-[400] hidden 800px:block ${
              active === 11 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
