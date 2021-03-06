import ProfileController from '../controllers/ProfileController';
import { profileFormConstraints, profileUpdateFormConstraints } from '../middlewares/profile';
import { verifyAuthToken, validateCatererToken } from '../middlewares/auth';
import { validateFormData, validParamId } from '../middlewares/validate';


export default function menuRoutes(app) {
  app.get('/profile', verifyAuthToken, validateCatererToken, validateFormData, ProfileController.getProfile);
  app.post('/profile', verifyAuthToken, validateCatererToken, profileFormConstraints, validateFormData, ProfileController.postProfile);
  app.put('/profile/:id', verifyAuthToken, validateCatererToken, validParamId, profileUpdateFormConstraints, validateFormData, ProfileController.putProfile);
}
