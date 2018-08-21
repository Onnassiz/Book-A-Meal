import React from 'react';
import UserProfileContainer from '../container/UserProfileContainer';
import NavBarContainer from '../container/NavBarContainer';

const Profile = () => (
  <div>
    <NavBarContainer page="user-profile" />
    <UserProfileContainer />
  </div>
);

export default Profile;
