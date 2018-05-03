import { user, meal } from '../models';


class UsersController {
	getUserAndMeals(req, res) {
		user.findOne({
			include: [{
				model: meal,
			}],
			where: { id: req.params.id },
		}).then((responseData) => {
			responseData.passwordHash = null;
			res.send(responseData);
		});
	}
}

module.exports = new UsersController();

