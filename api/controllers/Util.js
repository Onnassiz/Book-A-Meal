import jwt from 'jsonwebtoken';
import moment from 'moment';

export function signJsonWebToken(user) {
  const token = jwt.sign({
    data: user,
  }, process.env.JWT_SECRET);
  return token;
}

export function getErrorMessage(error) {
  const message = error.errors[0];
  return {
    [message.path]: message.message,
  };
}

export function menuViewModelFromArray(meals) {
  const viewModel = [];
  meals.forEach((item) => {
    viewModel.push({
      id: item.id,
      name: item.name,
      mealsCount: item.meals.length,
      mealsArray: [],
      meals: `/api/v1/meals/menu/${item.id}`,
      date: item.date,
      caterer: item.user.profile === null ? null : item.user.profile.businessName,
      profileId: item.user.profile === null ? null : item.user.profile.id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    });
  });
  return viewModel;
}

export function getMenusViewModel(menus, mealsCount = 0) {
  return menus.map(item => ({
    id: item.id,
    name: item.name,
    date: item.date,
    mealsArray: [],
    mealsCount: mealsCount || item.meals.length,
    meals: `/api/v1/meals/menu/${item.id}`,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));
}

export function buildMenus(newMenu, times = 0) {
  const menus = [];
  for (let i = 0; i <= times; i += 1) {
    menus.push({
      name: newMenu.name,
      date: moment(newMenu.date).add(i, 'days'),
      userId: newMenu.userId,
    });
  }
  return menus;
}
