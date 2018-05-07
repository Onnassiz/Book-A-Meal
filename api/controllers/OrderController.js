const { order, meal, mealOrder } = require('../models');

class OrdersController {
	getAllOrders(req, res) {
		order.findAll({
			include: [{
				model: meal,
			}],
		}).then((orders) => {
			res.status(200).send(orders);
		});
	}

	getOrdersByCatererId(req, res) {
		order.findAll({
			include: [{
				model: meal,
				where: { userId: req.params.id },
			}] }).then((orders) => {
			res.status(200).send(orders);
		});
	}

	getOrderById(req, res) {
		order.findOne({
			include: [{
				model: meal,
			}],
			where: { id: req.params.id },
		}).then((orders) => {
			res.status(200).send(orders);
		});
	}

	postOrder(req, res) {
		const { userId } = req.body;
		const newOrder = order.build({
			userId,
		});

		const newMealOrders = [];
		const meals = JSON.parse(req.body.meals);

		meals.forEach((ml) => {
			newMealOrders.push({
				orderId: newOrder.id,
				mealId: ml.mealId,
			});
		});

		newOrder.save().then(() => {
			mealOrder.bulkCreate(newMealOrders).then(() => {
				res.status(200).send({
					message: 'Order successfully created',
				});
			});
		});
	}

	putOrder(req, res) {
		const { userId } = req.body;
		order.findOne({ where: { id: req.params.id } }).then(() => {
			order.update(
				{
					userId,
				},
				{ where: { id: req.params.id }, returning: true },
			).then((updated) => {
				mealOrder.destroy({ where: { orderId: req.params.id } }).then(() => {
					const newMealOrders = [];
					const meals = JSON.parse(req.body.meals);

					meals.forEach((ml) => {
						newMealOrders.push({
							orderId: req.params.id,
							mealId: ml.mealId,
						});
					});

					mealOrder.bulkCreate(newMealOrders).then(() => {
						res.status(200).send(updated[1][0]);
					});
				});
			});
		});
	}
}

export default new OrdersController();
