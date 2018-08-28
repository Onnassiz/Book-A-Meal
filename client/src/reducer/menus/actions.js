
export const SET_MENUS_SERVER_ERRORS = 'SET_MENUS_SERVER_ERRORS';

export const setMenusErrorsAction = errors => ({
  type: SET_MENUS_SERVER_ERRORS,
  errors,
});
