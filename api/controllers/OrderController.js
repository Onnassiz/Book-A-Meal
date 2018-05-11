
import moment from 'moment';

import { order, meal, mealOrder } from '../models';
import sequelize from '../models/index';


class OrdersController {
	getAllOrders(req, res) {
		order.findAll({
			include: [{
				model: meal,
			}],
		}).then((orders) => {
			if (orders) {
				res.status(200).send(orders);
			} else {
				res.status(404).send({ message: 'Orders not found' });
			}
		});
	}

	getOrdersByUserId(req, res) {
		order.findAll({
			include: [{
				model: meal,
				where: { userId: req.params.id },
			}] }).then((orders) => {
			if (orders) {
				res.status(200).send(orders);
			} else {
				res.status(404).send({ message: 'Orders not found' });
			}
		});
	}

	getOrderById(req, res) {
		order.findOne({
			include: [{
				model: meal,
			}],
			where: { id: req.params.id },
		}).then((orders) => {
			if (orders) {
				res.status(200).send(orders);
			} else {
				res.status(404).send({ message: 'Order not found' });
			}
		});
	}

	postOrder(req, res) {
		const { amount, createdAt } = req.body;
		const userId = req.user.id;

		const newOrder = order.build({
			amount,
			userId,
			createdAt,
		});

		const newMealOrders = [];
		const { meals } = req.body;

		meals.forEach((ml) => {
			newMealOrders.push({
				orderId: newOrder.id,
				mealId: ml.mealId,
				units: ml.units,
			});
		});

		newOrder.save().then((ord) => {
			mealOrder.bulkCreate(newMealOrders).then(() => {
				res.status(200).send({
					message: 'Order successfully created',
					order: ord,
				});
			});
		});
	}

	putOrder(req, res) {
		const userId = req.user.id;
		order.findOne({ where: { id: req.params.id } }).then((ord) => {
			if (ord) {
				if (moment(ord.createdAt).add(60, 'minutes').isBefore(new Date())) {
					res.status(400).send({ message: 'You cannot modify an order 60 minutes after it is placed' });
				} else {
					order.update(
						{
							userId,
						},
						{ where: { id: req.params.id }, returning: true },
					).then((updated) => {
						const update = updated[1][0];
						mealOrder.destroy({ where: { orderId: req.params.id } }).then(() => {
							const newMealOrders = [];
							const { meals } = req.body;

							meals.forEach((ml) => {
								newMealOrders.push({
									orderId: req.params.id,
									mealId: ml.mealId,
								});
							});

							mealOrder.bulkCreate(newMealOrders).then(() => {
								res.status(201).send(update);
							});
						});
					});
				}
			} else {
				res.status(400).send({ message: 'Order not found' });
			}
		});
	}
}

export default new OrdersController();
