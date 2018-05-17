import ProfileController from '../controllers/ProfileController';
import profileFormConstraints from '../middlewares/profile';
import { verifyAuthToken, validateCatererToken } from '../middlewares/auth';
import { validateFormData, validParamId } from '../middlewares/validate';


export default function menuRoutes(app) {
	app.get('/profile/:id', verifyAuthToken, validateCatererToken, validParamId, validateFormData, ProfileController.getProfile);
	app.post('/profile', verifyAuthToken, validateCatererToken, profileFormConstraints, validateFormData, ProfileController.postProfile);
	app.put('/profile/:id', verifyAuthToken, validateCatererToken, validParamId, profileFormConstraints, validateFormData, ProfileController.putProfile);
}
