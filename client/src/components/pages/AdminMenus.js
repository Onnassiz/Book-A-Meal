import React from 'react';
import AdminMenusContainer from '../container/AdminMenusContainer';
import NavBarContainer from '../container/NavBarContainer';

const AdminMenus = () => (
  <div>
    <NavBarContainer page="caterer" />
    <AdminMenusContainer />
  </div>
);

export default AdminMenus;
