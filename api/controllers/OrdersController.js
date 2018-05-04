const { order, meal, mealOrder } = require('../models');

const OrdersServices = require('../modelServices/OrdersServices');

class OrdersController {
	getAllOrders(req, res) {
		order.findAll(
			{
				include: [{
					model: meal,
				}],
			}
		).then((orders) => {
			res.status(200).send(orders);
		}).catch((errors) => {
			res.status(400).send(errors);
		});
	}

	getOrdersByCatererId(req, res) {
		order.findAll(
			{
				include: [{
					model: meal,
					where: { userId: req.params.id }
				}],
			}
		).then((orders) => {
			res.status(200).send(orders);
		}).catch((errors) => {
			res.status(400).send(errors);
		});
	}

	getOrderById(req, res) {
		order.findOne(
			{
				include: [{
					model: meal,
				}],
				where: { id: req.params.id }
			}
		).then((orders) => {
			res.status(200).send(orders);
		}).catch((errors) => {
			res.status(400).send(errors);
		});
	}

	postOrder(req, res) {
		const { amount, userId } = req.body;
		const newOrder = order.build({
			userId,
		});

		const newMealOrders = [];
		req.body.meals.forEach((ml) => {
			return newMealOrders.push({
				orderId: newOrder.id,
				mealId: ml.mealId,
			});
		});

		newOrder.save().then(() => {
			mealOrder.bulkCreate(newMealOrders).then(() => {
				res.status(200).send('Order successfully created');
			}).catch((err) => {
				res.status(400).send(err);
			});
		});
	}

	putOrder(req, res) {
		const { amount, userId } = req.body;
		order.findOne({ where: { id: req.params.id } }).then((ord) => {
			if (ord.status === 'placed') {
				order.update(
					{
						userId,
					},
					{ where: { id: req.params.id }, returning: true },
				).then((updated) => {
					mealOrder.destroy({ where: { orderId: req.params.id } }).then(() => {
						const newMealOrders = [];
						req.body.meals.forEach((ml) => {
							return newMealOrders.push({
								orderId: req.params.id,
								mealId: ml.mealId,
							});
						});

						mealOrder.bulkCreate(newMealOrders).then(() => {
							res.status(200).send(updated[1][0]);
						}).catch((err) => {
							res.status(400).send(err);
						});
					});
				});
			} else {
				res.status(400).send('This order has been placed and can no longer be changed');
			}
		});
	}
}

module.exports = new OrdersController();
