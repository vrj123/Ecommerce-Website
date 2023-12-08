import React from 'react';
import { navItems } from '../../static/data';
import styles from '../../styles/styles';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className={`${styles.noramlFlex}`}>
    {
        navItems && navItems.map((item, index)=>{
            return(
                <div className='flex' key={index}>
                <NavLink className={({isActive})=>`${isActive?'text-[#17dd1f]':'text-white'} cursor-pointer px-6 font-500`} to={item.url}>{item.title}</NavLink>
                </div>
                
            )
        })
    }
        
    </div>
  )
}

export default Navbar;