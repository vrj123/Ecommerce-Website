import React from 'react';
import { navItems } from '../../static/data';
import styles from '../../styles/styles';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="flex flex-col 800px:flex-row mt-4 800px:mt-0">
    {
        navItems && navItems.map((item, index)=>{
            return(
                <div className='flex py-2 800px:py-0' key={index}>
                <NavLink className={({isActive})=>`${isActive?'text-[#17dd1f]':'800px:text-white'} cursor-pointer 800px:px-6 px-2 font-500`} to={item.url}>{item.title}</NavLink>
                </div>
                
            )
        })
    }
        
    </div>
  )
}

export default Navbar;