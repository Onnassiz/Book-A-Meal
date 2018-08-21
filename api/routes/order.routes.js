import OrderController from '../controllers/OrderController';
import orderFormConstraints from '../middlewares/order';
import { verifyAuthToken, validateToken } from '../middlewares/auth';
import { validateFormData, validParamId, validateQueryString } from '../middlewares/validate';

export default function menuRoutes(app) {
  app.get('/orders', verifyAuthToken, validateToken, validateQueryString, validateFormData, OrderController.getOrdersByUserId);
  app.get('/orders/:id', verifyAuthToken, validateToken, validParamId, validateFormData, OrderController.getOrderById);
  app.post('/orders', verifyAuthToken, validateToken, orderFormConstraints, validateFormData, OrderController.postOrder);
  app.put('/orders/:id', verifyAuthToken, validateToken, validParamId, orderFormConstraints, validateFormData, OrderController.putOrder);
}
