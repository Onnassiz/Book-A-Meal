import React from 'react';
import OrdersContainer from '../container/OrdersContainer';
import NavBarContainer from '../container/NavBarContainer';

const Orders = () => (
  <div>
    <NavBarContainer page="orders" />
    <OrdersContainer />
  </div>
);

export default Orders;
