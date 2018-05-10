import OrderController from '../controllers/OrderController';
import orderFormConstraints from '../middlewares/order';
import { verifyAuthToken, validateCatererToken, validateToken } from '../middlewares/auth';
import { validateFormData, validParamId } from '../middlewares/validate';


export default function menuRoutes(app) {
	app.get('/orders', verifyAuthToken, validateCatererToken, OrderController.getAllOrders);
	app.get('/orders/:id', verifyAuthToken, validateToken, validParamId, validateFormData, OrderController.getOrderById);
	app.get('/orders/user/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, OrderController.getOrdersByUserId);
	app.post('/orders', verifyAuthToken, validateToken, orderFormConstraints, validateFormData, OrderController.postOrder);
	app.put('/orders/:id', verifyAuthToken, validateToken, validParamId, orderFormConstraints, validateFormData, OrderController.putOrder);
}
