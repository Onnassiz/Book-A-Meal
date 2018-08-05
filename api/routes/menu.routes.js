import MenuController from '../controllers/MenuController';
import { menuFormConstraints, menuUpdateFormConstraints } from '../middlewares/menu';
import { verifyAuthToken, validateCatererToken, validateToken } from '../middlewares/auth';
import { validateFormData, validParamId, validateQueryString } from '../middlewares/validate';


export default function menuRoutes(app) {
  app.get('/menus', verifyAuthToken, validateToken, validateQueryString, validateFormData, MenuController.getMenus);
  app.get('/menus/user', verifyAuthToken, validateCatererToken, validateQueryString, validateFormData, MenuController.getMenusByUserId);
  app.get('/menus/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MenuController.getMenuByIdParam);
  app.post('/menus', verifyAuthToken, validateCatererToken, menuFormConstraints, validateFormData, MenuController.postMenu, MenuController.mapMenusToMeals);
  app.put('/menus/:id', verifyAuthToken, validateCatererToken, validParamId, menuUpdateFormConstraints, validateFormData, MenuController.putMenu);
  app.delete('/menus/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MenuController.deleteMenu);
}
