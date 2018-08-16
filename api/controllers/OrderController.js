
import moment from 'moment';

import { order, meal, mealOrder } from '../models';

class OrdersController {
  constructor() {
    this.postOrder = this.postOrder.bind(this);
    this.putOrder = this.putOrder.bind(this);
  }
  getAllOrders(req, res) {
    order.findAll({
      include: [{
        model: meal,
      }],
    }).then((orders) => {
      if (orders.length) {
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
      }],
      where: { userId: req.params.id },
    }).then((orders) => {
      if (orders.length) {
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

  getMealOrders(meals, newOrder) {
    const newMealOrders = [];
    meals.forEach((ml) => {
      newMealOrders.push({
        orderId: newOrder.id,
        mealId: ml.mealId,
        menuId: ml.menuId,
        profileId: ml.profileId,
        units: ml.units,
      });
    });
    return newMealOrders;
  }

  postOrder(req, res) {
    const { address, contact, meals } = req.body;
    const userId = req.user.id;

    const newOrder = order.build({
      contact,
      address,
      userId,
    });

    const newMealOrders = this.getMealOrders(meals, newOrder);

    newOrder.save().then((ord) => {
      mealOrder.bulkCreate(newMealOrders).then(() => {
        res.status(201).send({
          message: 'Order successfully created',
          order: ord,
        });
      });
    });
  }

  putOrder(req, res) {
    const { address, contact } = req.body;
    const userId = req.user.id;
    order.findOne({ where: { id: req.params.id } }).then((ord) => {
      if (ord) {
        if (moment(ord.createdAt).add(60, 'minutes').isBefore(new Date())) {
          res.status(400).send({ message: 'You cannot modify an order 60 minutes after it is placed' });
        } else {
          order.update(
            {
              address,
              contact,
              userId,
            },
            { where: { id: req.params.id }, returning: true },
          ).then((updated) => {
            this.updateOrderMeals(req, res, updated);
          });
        }
      } else {
        res.status(404).send({ message: 'Order not found' });
      }
    });
  }

  updateOrderMeals(req, res, updated) {
    const update = updated[1][0];
    mealOrder.destroy({ where: { orderId: req.params.id } }).then(() => {
      const { meals } = req.body;
      const newMealOrders = this.getMealOrders(meals, req.params);

      mealOrder.bulkCreate(newMealOrders).then(() => {
        res.status(200).send(update);
      });
    });
  }
}

export default new OrdersController();
