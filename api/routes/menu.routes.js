import MenuController from '../controllers/MenuController';
import menuFormConstraints from '../middlewares/menu';
import { verifyAuthToken, validateCatererToken, validateToken } from '../middlewares/auth';
import { validateFormData, validParamId } from '../middlewares/validate';


export default function menuRoutes(app) {
	app.get('/menus', verifyAuthToken, validateCatererToken, MenuController.getMenus);
	app.get('/menus/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MenuController.getMenuAndMeals);
	app.get('/menus/user/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MenuController.getMenusByUserId);
	app.get('/menus/unixTime/:timeStamp', verifyAuthToken, validateToken, MenuController.getMenusByTimeStamp);
	app.post('/menus', verifyAuthToken, validateCatererToken, menuFormConstraints, validateFormData, MenuController.postMenu);
	app.put('/menus/:id', verifyAuthToken, validateCatererToken, validParamId, menuFormConstraints, validateFormData, MenuController.putMenu);
	app.delete('/menus/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, MenuController.deleteMenu);
}
