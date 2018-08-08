import React from 'react';
import ProfileContainer from '../container/ProfileContainer';
import NavBarContainer from '../container/NavBarContainer';

const Profile = () => (
  <div>
    <NavBarContainer page="caterer" />
    <ProfileContainer />
  </div>
);

export default Profile;
