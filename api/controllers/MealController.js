import sequelize from 'sequelize';
import { meal, user, profile } from '../models';

const mealViewModelFromArray = (meals) => {
	const viewModel = [];
	meals.forEach((item) => {
		viewModel.push({
			id: item.id,
			name: item.name,
			price: item.price,
			category: item.category,
			description: item.description,
			createdAt: item.createdAt,
			updatedAt: item.updatedAt,
			caterer: item.user.profile.businessName,
			imageUrl: item.imageUrl,
		});
	});
	return viewModel;
};

const mealViewModel = (item) => {
	const viewModel = {
		id: item.id,
		name: item.name,
		price: item.price,
		category: item.category,
		description: item.description,
		createdAt: item.createdAt,
		updatedAt: item.updatedAt,
		caterer: item.user.profile.businessName,
		imageUrl: item.imageUrl,
	};
	return viewModel;
};


class MealsController {
	getMeals(req, res) {
		meal.findAll({ include: [{ model: user, include: [{ model: profile }] }], order: sequelize.literal('name') }).then((meals) => {
			const viewModel = mealViewModelFromArray(meals);
			res.status(200).send(viewModel);
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
			const response = responseData;
			response.passwordHash = null;
			res.send(response);
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
				meal.findOne({
					include: [{ model: user, include: [{ model: profile }] }],
					where: { id: update.id },
				}).then(returnedMeal => res.status(200).send(mealViewModel(returnedMeal)));
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
					meal.findOne({
						include: [{ model: user, include: [{ model: profile }] }],
						where: { id: response.id },
					}).then(returnedMeal => res.status(201).send(mealViewModel(returnedMeal)));
				});
			}
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
				meal.findOne({
					include: [{ model: user, include: [{ model: profile }] }],
					where: { id: update.id },
				}).then(returnedMeal => res.status(200).send(mealViewModel(returnedMeal)));
			} else {
				res.status(404).send({
					message: 'Meal not found',
				});
			}
		});
	}

	deleteMeal(req, res) {
		meal.destroy({
			where: { id: req.params.id },
		}).then((deleted) => {
			if (deleted) {
				res.status(200).send({
					message: 'Meal successfully deleted',
				});
			} else {
				res.status(404).send({
					message: 'Meal not found',
				});
			}
		});
	}
}

export default new MealsController();
