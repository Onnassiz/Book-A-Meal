import React from 'react';
import MealsContainer from '../container/MealsContainer';
import NavBarContainer from '../container/NavBarContainer';

const Meals = () => (
  <div>
    <NavBarContainer page="caterer" />
    <MealsContainer />
  </div>
);

export default Meals;
