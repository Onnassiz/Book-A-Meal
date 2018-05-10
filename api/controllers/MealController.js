
import { meal, user } from '../models';

class MealsController {
	getMeals(req, res) {
		meal.findAll().then((meals) => {
			res.status(200).send(meals);
		});
	}

	getMealById(req, res) {
		meal.findById(req.params.id).then((ml) => {
			if (ml) {
				res.status(200).send(ml);
			} else {
				res.status(404).send({
					message: 'Meal not found',
				});
			}
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
			const update = updated[1][0];
			if (update) {
				res.status(200).send(update);
			} else {
				res.status(404).send({
					message: 'Meal not found',
				});
			}
		});
	}

	postMeal(req, res) {
		const newMeal = meal.build({
			name: req.body.name,
			price: req.body.price,
			description: req.body.description,
			userId: req.user.id,
			category: req.body.category,
			imageUrl: req.body.imageUrl,
		});

		meal.findOne({ where: { name: newMeal.name, userId: newMeal.userId } }).then((existingMeal) => {
			if (existingMeal) {
				res.status(400).send({
					message: 'You have already created a meal with this name',
				});
			} else {
				newMeal.save().then((response) => {
					res.status(201).send(response);
				}).catch((error) => {
					res.status(400).send(error);
				});
			}
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
				userId: req.user.id,
				category: req.body.category,
				imageUrl: req.body.imageUrl,
			},
			{ where: { id: req.params.id }, returning: true },
		).then((updated) => {
			const update = updated[1][0];
			if (update) {
				res.status(200).send(update);
			} else {
				res.status(404).send({
					message: 'Meal not found',
				});
			}
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
