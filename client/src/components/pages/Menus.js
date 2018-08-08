import React from 'react';
import MenusContainer from '../container/MenusContainer';
import NavBarContainer from '../container/NavBarContainer';

const Menus = () => (
  <div>
    <NavBarContainer page="menus" />
    <MenusContainer />
  </div>
);

export default Menus;
