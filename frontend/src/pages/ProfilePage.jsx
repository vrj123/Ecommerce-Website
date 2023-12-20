import React, { useState } from 'react'
import Header from '../components/Layout/Header';
import ProfileContent from '../components/Profile/ProfileContent';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import styles from '../styles/styles';

const ProfilePage = () => {
    const [active, setActive]=useState(1);
  return (
    <div className='mb-[100px]'>
        <Header/>
        <div className={`${styles.section} bg-[#f5f5f5] flex mt-[40px]`}>
            <div className='w-[50px] 800px:w-[350px]'>
                <ProfileSidebar active={active} setActive={setActive}/>
            </div>
            <ProfileContent active={active}/>
        </div>
    </div>
  )
}

export default ProfilePage;