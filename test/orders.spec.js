const { expect } = require('chai');
const { describe, it } = require('mocha');
const orders = require('../api/mockups/orders');

const OrdersServices = require('../api/modelServices/OrdersServices');


describe('Orders Model', () => {
  describe('Constructor', () => {
    it('orders should be an array of orders', () => {
      expect(Array.isArray(OrdersServices.orders)).to.equal(true);
    });
  });


  describe('Get all orders', () => {
    it('should return all orders', () => {
      expect(OrdersServices.getAllOrders()).to.equal(orders);
    });
  });

  describe('Get order by ID', () => {
    it('should return order for a specified id', () => {
      expect(OrdersServices.getSingleOrder(1)).to.equal(orders[0]);
    });
  });

  describe('Add to orders', () => {
    it('should increase the orders size by one', () => {
      const ordersSize = OrdersServices.getAllOrders().length;
      const order = {
        id: 5,
        dateTime: '2018-04-28 : 16:23',
        meals: [
          {
            id: 1,
            name: 'Chicken Pa-Naeng - Beef',
            description: 'Red Curry with Peanut Sauce, Bamboo Shoot, Ginger, Bell Pepper, Green Bean, Galanga and Lemon Leaves. Choice of Chicken, Beef, Pork, Tofu or Shrimp.',
            price: 2300,
            category: 'Hot Meal',
            image: '1.jpg',
          },
        ],
        amount: 4800,
        user: {
          id: 2,
          username: 'ifyben4me@gmail.com',
          password: 'password',
          name: 'Onah Ifeanyi',
          role: 'caterer',
          active: true,
        },
      };

      OrdersServices.addOrder(order);
      expect(OrdersServices.getAllOrders().length).to.equal(ordersSize + 1);
    });

    it('should return false if order is empty', () => {
      expect(OrdersServices.addOrder({})).to.equal(false);
    });
  });

  describe('Update order', () => {
    it('should update the value of a specified order', () => {
      const order = {
        id: 4,
        dateTime: '2018-04-28 : 16:23',
        meals: [
          {
            id: 1,
            name: 'Chicken Pa-Naeng - Beef',
            description: 'Red Curry with Peanut Sauce, Bamboo Shoot, Ginger, Bell Pepper, Green Bean, Galanga and Lemon Leaves. Choice of Chicken, Beef, Pork, Tofu or Shrimp.',
            price: 2300,
            category: 'Hot Meal',
            image: '1.jpg',
          },
        ],
        amount: 4800,
        user: {
          id: 2,
          username: 'ifyben4me@gmail.com',
          password: 'password',
          name: 'Onah Ifeanyi',
          role: 'caterer',
          active: true,
        },
      };
      expect(OrdersServices.updateOrder(4, order)).to.equal(true);
    });

    it('should return false if id is wrong', () => {
      expect(OrdersServices.updateOrder(18, {})).to.equal(false);
    });

    it('should return false if order is empty', () => {
      expect(OrdersServices.updateOrder(1, {})).to.equal(false);
    });
  });
});
