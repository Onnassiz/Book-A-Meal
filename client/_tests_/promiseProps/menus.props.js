import { getMenusMock, singleMenu } from '../objectProps/menus.props';
import { getMealsMock } from '../objectProps/meals.props';

export const getMenus = () => new Promise((resolve) => {
  resolve({
    status: 200,
    data: {
      menus: getMenusMock(11),
      count: 11,
    },
  });
});

export const getMealsInMenu = () => new Promise((resolve) => {
  resolve({
    response: {
      status: 200,
      data: getMealsMock(),
    },
  });
});

export const updateMenu = () => new Promise((resolve) => {
  resolve({
    status: 200,
    data: {
      menu: singleMenu,
    },
  });
});

export const postMenu = () => new Promise((resolve) => {
  resolve({
    status: 201,
    data: {
      menu: singleMenu,
    },
  });
});

export const deleteMenu = () => new Promise((resolve) => {
  resolve({
    status: 200,
  });
});

