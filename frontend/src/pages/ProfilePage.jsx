import React, { useState } from "react";
import TopHeader from "../components/Layout/TopHeader";
import ProfileContent from "../components/Profile/ProfileContent";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import styles from "../styles/styles";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  return (
    <div>
      <div className="fixed top-0 left-0 w-full">
        <TopHeader />
      </div>
      <div className={`${styles.section} bg-[#f5f5f5] flex 800px:mt-[90px] mt-[60px]`}>
        <div className="w-[50px] 800px:w-[350px]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <ProfileContent active={active} />
      </div>
    </div>
  );
};

export default ProfilePage;
