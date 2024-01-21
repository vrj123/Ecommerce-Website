import React from 'react'
import Header from '../components/Layout/Header';
import ProfileSidebar from '../components/Profile/ProfileSidebar';
import UserInbox from '../components/UserInbox/UserInbox';

const UserInboxPage = () => {
  return (
    <div>
      <Header />
      <UserInbox/>
    </div>
  )
}

export default UserInboxPage;