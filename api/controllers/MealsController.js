/* eslint class-methods-use-this: ["off"] */
/* eslint object-curly-newline: ["off"] */
import { meal } from '../models';

class MealsController {
	getMeals(req, res) {
		meal.findAll().then((meals) => {
			res.status(200).send(meals);
		});
	}

	getMealById(req, res) {
		meal.findById(req.params.id).then((meal) => {
			res.status(200).send(meal);
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
		}).catch(() => {
			res.status(400).send('An error has been detected while creating a new meal. Please try again.');
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
		}).catch(() => {
			res.status(400).send('An error has been detected while updating a new meal. Please try again.');
		});
	}

	deleteMeal(req, res) {
		meal.destroy({
			where: { id: req.params.id },
		}).then(() => {
			res.status(200).send('Meal successfully delete');
		});
	}
}

module.exports = new MealsController();
