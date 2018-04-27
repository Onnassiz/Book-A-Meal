/* eslint class-methods-use-this: ["off"] */
/* eslint object-curly-newline: ["off"] */

const OrdersServices = require('../modelServices/OrdersServices');

class OrdersController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/orders', this.getAllOrders.bind(this));
    this.router.get('/orders/:id', this.getOrderById.bind(this));
    this.router.get('/orders/user/:id', this.getOrdersByUserId.bind(this));
    this.router.post('/orders', this.postOrder.bind(this));
    this.router.put('/orders?:id', this.putOrder.bind(this));
  }

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
    const { order } = req.body;
    if (OrdersServices.addOrder(order)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }

  putOrder(req, res) {
    const { order } = req.body;
    const id = parseInt(req.params.id, 10);

    if (OrdersServices.updateOrder(id, order)) {
      res.sendStatus(200);
    } else {
      res.status(400).send('error updating order');
    }
  }
}

module.exports = OrdersController;