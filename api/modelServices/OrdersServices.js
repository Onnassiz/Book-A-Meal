
const orders = require('../mockups/orders');
const _ = require('lodash');

class OrdersServices {
  constructor(_orders) {
    this.orders = _orders;
  }

  getAllOrders() {
    return this.orders;
  }

  getSingleOrder(id) {
    return this.orders.find(x => x.id === id);
  }

  getUserOrders(userId) {
    return this.orders.find(x => x.user.id === userId);
  }

  addOrder(order) {
    if (!_.isEmpty(order)) {
      this.orders.push(order);
    }
    return false;
  }

  updateOrder(id, order) {
    const existingOrder = this.getSingleOrder(id);
    if (existingOrder) {
      if (!_.isEmpty(order)) {
        const index = this.orders.findIndex(x => x.id === id);
        this.orders[index] = order;
        return true;
      }
      return false;
    }
    return false;
  }
}

module.exports = new OrdersServices(orders);
