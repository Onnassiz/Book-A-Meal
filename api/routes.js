import AuthController from './controllers/AuthController';

import { signInConstraints, signUpConstraints } from './middlewares/auth';
import { validateFormData } from './middlewares/validate';


import mealRoutes from './routes/meal.routes';
import menuRoutes from './routes/menu.routes';
import orderRoutes from './routes/order.routes';
import profileRoutes from './routes/profile.routes';

export default function routes(app) {
	app.post('/auth/signUp', signUpConstraints, validateFormData, AuthController.signUp);
	app.post('/auth/signIn', signInConstraints, validateFormData, AuthController.signIn);

	mealRoutes(app);
	menuRoutes(app);
	orderRoutes(app);
	profileRoutes(app);
}

