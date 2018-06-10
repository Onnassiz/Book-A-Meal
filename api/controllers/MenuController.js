
import { menu, meal, menuMeal } from '../models';

class MenusController {
	constructor() {
		this.postMenu = this.postMenu.bind(this);
		this.putMenu = this.putMenu.bind(this);
	}

	getMenusByUserId(req, res) {
		menu.findAll({
			include: [{
				model: meal,
			}],
			where: { userId: req.user.id },
			order: ['unixTime'],
		}).then((menus) => {
			res.status(200).send(menus);
		});
	}

	getMenuById(id) {
		return menu.findOne({
			include: [{
				model: meal,
			}],
			where: { id },
		}).then((responseData) => {
			return responseData;
		});
	}

	getMenuAndMeals(req, res) {
		menu.findOne({
			include: [{
				model: meal,
			}],
			where: { id: req.params.id },
		}).then((responseData) => {
			if (responseData) {
				res.status(200).send(responseData);
			} else {
				res.status(404).send({ message: 'Menu not found' });
			}
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
			if (responseData.length) {
				res.status(200).send(responseData);
			} else {
				res.status(404).send({ message: 'Menu not found' });
			}
		});
	}


	postMenu(req, res) {
		const { unixTime, name } = req.body;
		const userId = req.user.id;
		const newMenu = menu.build({
			name,
			unixTime,
			userId,
		});

		menu.findOne({ where: { userId, unixTime } }).then((mn) => {
			if (mn) {
				res.status(400).send({
					message: 'You have already created a menu for the selected date. You can still modify the already created menu',
				});
			} else {
				const newMealMenus = [];
				const { meals } = req.body;
				meals.forEach((ml) => {
					newMealMenus.push({
						menuId: newMenu.id,
						mealId: ml.mealId,
					});
				});

				newMenu.save().then((createdMenu) => {
					menuMeal.bulkCreate(newMealMenus).then(() => {
						this.getMenuById(createdMenu.id).then((responseData) => {
							res.status(201).send({
								message: 'Menu successfully created',
								menu: responseData,
							});
						});
					});
				});
			}
		});
	}

	putMenu(req, res) {
		const { unixTime } = req.body;
		const userId = req.user.id;
		menu.update(
			{
				id: req.params.id,
				name: req.body.name,
				unixTime,
				userId,
			},
			{ where: { id: req.params.id }, returning: true },
		).then((updated) => {
			const update = updated[1][0];
			if (update) {
				menuMeal.destroy({ where: { menuId: req.params.id } }).then(() => {
					const newMealMenus = [];
					const { meals } = req.body;

					meals.forEach((ml) => {
						newMealMenus.push({
							menuId: req.params.id,
							mealId: ml.mealId,
						});
					});

					menuMeal.bulkCreate(newMealMenus).then(() => {
						this.getMenuById(update.id).then((responseData) => {
							res.status(200).send({
								message: 'Menu successfully updated',
								menu: responseData,
							});
						});
					});
				});
			} else {
				res.status(404).send({ message: 'Menu not found' });
			}
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
