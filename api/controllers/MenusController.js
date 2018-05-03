
/* eslint class-methods-use-this: ["off"] */
/* eslint object-curly-newline: ["off"] */
import { menu } from '../models';
import { meal } from '../models';
import { menuMeal } from '../models';



class MenusController {
	getMenusByUserId(req, res) {
		menu.findAll({ where: { userId: req.params.id } }).then((menus) => {
			res.status(200).send(menus);
		}).catch((errors) => {
			res.status(400).send(errors);
		});
	}

	getMenuAndMeals(req, res) {
		menu.findOne(
			{
				include: [{
					model: meal,
				}],
				where: { id: req.params.id } 
			},
		).then((responseData) => {
			res.status(200).send(responseData);
		}).catch((errors) => {
			res.status(400).send(errors);
		});
	}

	getMenusByTimeStamp(req, res) {
		const timeStamp = parseInt(req.params.timeStamp, 10);
		menu.findAll(
			{
				include: [{
					model: meal,
				}],
				where: { unixTime: timeStamp }
			},
		).then((responseData) => {
			res.status(200).send(responseData);
		}).catch((errors) => {
			res.status(400).send(errors);
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
				res.status(400).send('You have already created menu for the selected date. You can still modify the already created menu');
			} else {
				const newMealMenus = [];
				req.body.meals.forEach((ml) => {
					return newMealMenus.push({
						menuId: newMenu.id,
						mealId: ml.mealId,
					});
				});

				newMenu.save().then(() => {
					menuMeal.bulkCreate(newMealMenus).then(() => {
						res.send('inserted');
					}).catch((err) => {
						res.send(err);
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
			{ where: { id: req.params.id  }, returning: true },
		).then((updated) => {
			menuMeal.destroy({ where: { menuId: req.params.id } }).then(() => {
				const newMealMenus = [];
				req.body.meals.forEach((ml) => {
					return newMealMenus.push({
						menuId: req.params.id,
						mealId: ml.mealId,
					});
				});

				menuMeal.bulkCreate(newMealMenus).then(() => {
					res.send(updated);
				}).catch((err) => {
					res.send(err);
				});
			});
		});
	}

	deleteMenu(req, res) {
		menu.destroy({
			where: { id: req.params.id },
		}).then(() => {
			res.status(200).send('Menu successfully delete');
		});
	}
}

module.exports = new MenusController();
