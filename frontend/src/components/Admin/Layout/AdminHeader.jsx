import React from 'react'
import { AiOutlineGift } from 'react-icons/ai';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { FiPackage, FiShoppingBag } from 'react-icons/fi';
import { MdOutlineLocalOffer } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { local_server } from '../../../server';

const AdminHeader = () => {

    const {user}=useSelector((state)=>state.user);
  return (
    <div className='w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4'>
        <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
        </div>
        <div className='flex items-center'>
            <div className='flex items-center mr-4'>
                <Link to='/dashboard/coupons' className='hidden 800px:block'>
                    <AiOutlineGift className='cursor-pointer mx-5' color='#555' size={30}/>
                </Link>
                <Link to='/dashboard-events' className='hidden 800px:block'>
                    <MdOutlineLocalOffer className='cursor-pointer mx-5' color='#555' size={30}/>
                </Link>
                <Link to='/dashboard-products' className='hidden 800px:block'>
                    <FiShoppingBag className='cursor-pointer mx-5' color='#555' size={30}/>
                </Link>
                <Link to='/dashboard-orders' className='hidden 800px:block'>
                    <FiPackage className='cursor-pointer mx-5' color='#555' size={30}/>
                </Link>
                <Link to='/dashboard-messages' className='hidden 800px:block'>
                    <BiMessageSquareDetail className='cursor-pointer mx-5' color='#555' size={30}/>
                </Link>
                <Link to={`/shop/${user?._id}`}>
                    <img
                      src={`${local_server}${user?.avatar}`}
                      alt=""
                      className="w-[35px] h-[35px] rounded-full"
                    />
                  </Link>
            </div>
        </div>
    </div>
  )
}

export default AdminHeader;