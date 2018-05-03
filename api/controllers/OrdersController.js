
const OrdersServices = require('../modelServices/OrdersServices');

class OrdersController {
  getAllOrders(req, res) {
    res.send(OrdersServices.getAllOrders());
  }

  getOrderById(req, res) {
    const id = parseInt(req.params.id, 10);
    const order = OrdersServices.getSingleOrder(id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send('order not found');
    }
  }

  getOrdersByUserId(req, res) {
    const userId = parseInt(req.params.userId, 10);
    res.send(OrdersServices.getUserOrders(userId));
  }

  postOrder(req, res) {
    const order = req.body;
    if (OrdersServices.addOrder(order)) {
      res.status(200).send('Order successfully added');
    } else {
      res.status(400).send('Error adding order');
    }
  }

  putOrder(req, res) {
    const order = req.body;
    const id = parseInt(req.params.id, 10);

    if (OrdersServices.updateOrder(id, order)) {
      res.status(200).send('order successfully updated');
    } else {
      res.status(400).send('error updating order');
    }
  }
}

module.exports = new OrdersController();
