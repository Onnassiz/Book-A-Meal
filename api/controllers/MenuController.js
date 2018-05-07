
import { menu, meal, menuMeal } from '../models';

class MenusController {
	getMenusByUserId(req, res) {
		menu.findAll({
			include: [{
				model: meal,
			}],
			where: { userId: req.params.id },
		}).then((menus) => {
			res.status(200).send(menus);
		}).catch((errors) => {
			res.status(404).send(errors);
		});
	}

	getMenuAndMeals(req, res) {
		menu.findOne({
			include: [{
				model: meal,
			}],
			where: { id: req.params.id },
		}).then((responseData) => {
			res.status(200).send(responseData);
		});
	}

	getMenus(req, res) {
		menu.findAll({
			include: [{
				model: meal,
			}],
		}).then((responseData) => {
			res.status(200).send(responseData);
		});
	}

	getMenusByTimeStamp(req, res) {
		const timeStamp = parseInt(req.params.timeStamp, 10);
		menu.findAll({
			include: [{
				model: meal,
			}],
			where: { unixTime: timeStamp },
		}).then((responseData) => {
			res.status(200).send(responseData);
		});
	}

	postMenu(req, res) {
		const { unixTime, userId } = req.body;
		const newMenu = menu.build({
			name: req.body.name,
			unixTime,
			userId,
		});

		menu.findOne({ where: { userId, unixTime } }).then((mn) => {
			if (mn) {
				res.status(400).send({
					message: 'You have already created menu for the selected date. You can still modify the already created menu',
				});
			} else {
				const newMealMenus = [];
				const meals = JSON.parse(req.body.meals);
				meals.forEach((ml) => {
					newMealMenus.push({
						menuId: newMenu.id,
						mealId: ml.mealId,
					});
				});

				newMenu.save().then(() => {
					menuMeal.bulkCreate(newMealMenus).then(() => {
						res.status(200).send({
							message: 'Menu successfully created',
						});
					});
				});
			}
		});
	}

	putMenu(req, res) {
		const { unixTime, userId } = req.body;
		menu.update(
			{
				id: req.params.id,
				name: req.body.name,
				unixTime,
				userId,
			},
			{ where: { id: req.params.id }, returning: true },
		).then((updated) => {
			menuMeal.destroy({ where: { menuId: req.params.id } }).then(() => {
				const newMealMenus = [];
				const meals = JSON.parse(req.body.meals);
	
				meals.forEach((ml) => {
					newMealMenus.push({
						menuId: req.params.id,
						mealId: ml.mealId,
					});
				});

				menuMeal.bulkCreate(newMealMenus).then(() => {
					res.status(200).send(updated[1][0]);
				});
			});
		});
	}

	deleteMenu(req, res) {
		menu.destroy({
			where: { id: req.params.id },
		}).then(() => {
			res.status(200).send({
				message: 'Menu successfully deleted',
			});
		});
	}
}

export default new MenusController();
