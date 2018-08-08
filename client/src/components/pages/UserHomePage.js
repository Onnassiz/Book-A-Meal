import React from 'react';
import UserHomePageContainer from '../container/UserHomePageContainer';
import NavBarContainer from '../container/NavBarContainer';

const UserHomePage = () => (
  <div>
    <NavBarContainer page="home" />
    <UserHomePageContainer />
  </div>
);

export default UserHomePage;
