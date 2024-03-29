import React from 'react'
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineLogout, AiOutlineMessage } from 'react-icons/ai';
import { HiOutlineInbox, HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { MdOutlineTrackChanges } from 'react-icons/md';
import { RxPerson } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import {TbAddressBook, TbCodeAsterix} from 'react-icons/tb';
import axios from 'axios';
import {toast} from 'react-toastify';
import {server} from '../../server';
import {RiAdminLine, RiLockPasswordLine} from 'react-icons/ri';
import { useSelector } from 'react-redux';

const ProfileSidebar = ({active, setActive}) => {

    const navigate=useNavigate();
    const {user}=useSelector((state)=>state.user);

    const handleLogout=()=>{
        axios.get(`${server}/user/logout`, {withCredentials:true}).then((res)=>{
            toast.success(res.data.message);
            window.location.reload(true);
            navigate('/login');
        }).catch((error)=>console.log(error.response.data.message))
    }

  return (
    <div className='w-full bg-white pt-8 p-4 shadow-sm overflow-y-scroll h-[87vh]'>
        <div className={`flex items-center cursor-pointer w-full mb-8 text-${active===1?"[red]":null}`}
        onClick={()=>setActive(1)}>
            <RxPerson/>
            <span className='pl-3 hidden 800px:block'>Profile</span>
        </div>
        <div className={`flex items-center cursor-pointer w-full mb-8 text-${active===2?"[red]":null}`}
        onClick={()=>setActive(2)}>
            <HiOutlineShoppingBag/>
            <span className='pl-3 hidden 800px:block'>Orders</span>
        </div>
        <div className={`flex items-center cursor-pointer w-full mb-8 text-${active===3?"[red]":null}`}
        onClick={()=>setActive(3)}>
            <HiOutlineReceiptRefund/>
            <span className='pl-3 hidden 800px:block'>Refunds</span>
        </div>
        <div className={`flex items-center cursor-pointer w-full mb-8 text-${active===4?"[red]":null}`}
        onClick={()=>setActive(4) || navigate('/inbox')}>
            <AiOutlineMessage/>
            <span className='pl-3 hidden 800px:block'>Inbox</span>
        </div>
        <div className={`flex items-center cursor-pointer w-full mb-8 text-${active===5?"[red]":null}`}
        onClick={()=>setActive(5)}>
            <MdOutlineTrackChanges/>
            <span className='pl-3 hidden 800px:block'>Track Orders</span>
        </div>
        <div className={`flex items-center cursor-pointer w-full mb-8 text-${active===6?"[red]":null}`}
        onClick={()=>setActive(6)}>
            <RiLockPasswordLine/>
            <span className='pl-3 hidden 800px:block'>Change Password</span>
        </div>
        <div className={`flex items-center cursor-pointer w-full mb-8 text-${active===7?"[red]":null}`}
        onClick={()=>setActive(7)}>
            <TbAddressBook/>
            <span className='pl-3 hidden 800px:block'>Address</span>
        </div>
        {user && user.role === "Admin" && (
        <div
          className={`flex items-center cursor-pointer w-full mb-8 text-${
            active === 9 ? "[red]" : null
          }`}
          onClick={()=>navigate('/admin/dashboard')}
        >
          <RiAdminLine />
          <span className="pl-3 hidden 800px:block">Admin Dashboard</span>
        </div>
      )}
        <div className={`flex items-center cursor-pointer w-full mb-8 text-${active===8?"[red]":null}`}
        onClick={()=>setActive(8) || handleLogout()}>
            <AiOutlineLogout/>
            <span className='pl-3 hidden 800px:block'>Logout</span>
        </div>
    </div>
  )
}

export default ProfileSidebar;