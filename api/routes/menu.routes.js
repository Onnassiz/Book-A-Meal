import MenuController from '../controllers/MenuController';
import menuFormConstraints from '../middlewares/menu';
import { verifyAuthToken, validateCatererToken, validateToken } from '../middlewares/auth';
import { validateFormData, validParamId } from '../middlewares/validate';


export default function menuRoutes(app) {
  app.get('/menus/id/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MenuController.getMenuAndMeals);
  app.get('/menus/unixTime/:timeStamp/:offset?/:limit?', verifyAuthToken, validateToken, MenuController.getMenusByTimeStamp);
  app.get('/menus/user/:offset?/:limit?', verifyAuthToken, validateCatererToken, validateFormData, MenuController.getMenusByUserId);
  app.get('/menus/:offset?/:limit?', verifyAuthToken, validateCatererToken, MenuController.getMenus);
  app.post('/menus', verifyAuthToken, validateCatererToken, menuFormConstraints, validateFormData, MenuController.postMenu, MenuController.mapMenusToMeals);
  app.put('/menus/:id', verifyAuthToken, validateCatererToken, validParamId, menuFormConstraints, validateFormData, MenuController.putMenu);
  app.delete('/menus/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MenuController.deleteMenu);
}
