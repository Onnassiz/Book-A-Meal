
import { meal, user } from '../models';

class MealsController {
	getMeals(req, res) {
		meal.findAll().then((meals) => {
			res.status(200).send(meals);
		});
	}

	getMealById(req, res) {
		meal.findById(req.params.id).then((ml) => {
			res.status(200).send(ml);
		});
	}

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

	putImage(req, res) {
		meal.update(
			{
				imageUrl: req.body.imageUrl,
			},
			{ where: { id: req.params.id }, returning: true },
		).then((updated) => {
			res.status(200).send(updated[1][0]);
		});
	}

	postMeal(req, res) {
		const newMeal = meal.build({
			name: req.body.name,
			price: req.body.price,
			description: req.body.description,
			userId: req.body.userId,
			category: req.body.category,
			imageUrl: req.body.imageUrl,
		});

		newMeal.save().then((response) => {
			res.status(200).send(response);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}

	putMeal(req, res) {
		meal.update(
			{
				name: req.body.name,
				price: req.body.price,
				description: req.body.description,
				userId: req.body.userId,
				category: req.body.category,
				imageUrl: req.body.imageUrl,
			},
			{ where: { id: req.params.id }, returning: true },
		).then((updated) => {
			res.status(200).send(updated[1][0]);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}

	deleteMeal(req, res) {
		meal.destroy({
			where: { id: req.params.id },
		}).then(() => {
			res.status(200).send({
				message: 'Meal successfully deleted',
			});
		});
	}
}

export default new MealsController();
