
import moment from 'moment';

import { order, meal, mealOrder } from '../models';

function calculateTotalPrice(meals) {
  let totalPrice = 0;
  meals.forEach((item) => {
    totalPrice = (item.mealOrder.price * item.mealOrder.units) + totalPrice;
  });
  return totalPrice;
}

function prepareOrderResponse(orders) {
  const responseData = [];
  orders.forEach((item) => {
    responseData.push({
      id: item.id,
      address: item.address,
      contact: item.contact,
      userId: item.userId,
      totalPrice: calculateTotalPrice(item.meals),
      mealsCount: item.meals.length,
      mealsArray: [],
      meals: `api/v1/meals/order/${item.id}`,
      createdAt: item.createdAt,
    });
  });
  return responseData;
}

class OrdersController {
  constructor() {
    this.postOrder = this.postOrder.bind(this);
    this.putOrder = this.putOrder.bind(this);
  }

  getOrdersByUserId(req, res) {
    const { limit, offset } = req.query;
    order.findAndCountAll({
      distinct: true,
      include: [{ model: meal }],
      where: { userId: req.user.id },
      limit: limit || 10,
      offset: offset || 0,
      order: [['createdAt', 'DESC']],
    }).then((orders) => {
      if (orders.count) {
        res.status(200).send({
          count: orders.count,
          orders: prepareOrderResponse(orders.rows),
        });
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
    }).then((result) => {
      if (result) {
        res.status(200).send(prepareOrderResponse([result])[0]);
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
        price: ml.price,
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

    newOrder.save().then((createdOrder) => {
      mealOrder.bulkCreate(newMealOrders).then(() => {
        res.status(201).send({
          message: 'Order successfully created',
          order: createdOrder,
          meals,
        });
      });
    });
  }

  putOrder(req, res) {
    const { address, contact } = req.body;
    const userId = req.user.id;
    order.findOne({ where: { id: req.params.id, userId: req.user.id } }).then((ord) => {
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
          ).then(() => {
            this.updateOrderMeals(req, res);
          });
        }
      } else {
        res.status(404).send({ message: 'Order not found' });
      }
    });
  }

  updateOrderMeals(req, res) {
    mealOrder.destroy({ where: { orderId: req.params.id } }).then(() => {
      const { meals } = req.body;
      const newMealOrders = this.getMealOrders(meals, req.params);

      mealOrder.bulkCreate(newMealOrders).then(() => {
        order.findOne({
          include: [{ model: meal }],
          where: { id: req.params.id },
        }).then((result) => {
          res.status(200).send({
            order: prepareOrderResponse([result])[0],
            meals,
            message: 'Order successfully updated',
          });
        });
      });
    });
  }
}

export default new OrdersController();
