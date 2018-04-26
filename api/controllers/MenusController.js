
/* eslint class-methods-use-this: ["off"] */
/* eslint object-curly-newline: ["off"] */

const MenusServices = require('../modelServices/MenusServices');

class MenusController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/meals', this.getMenus.bind(this));
    this.router.get('/meals/:timeStamp', this.getMenuByTimeStamp.bind(this));
    this.router.post('/meals', this.postMenu.bind(this));
    this.router.put('/meals/:timeStamp', this.putMenu.bind(this));
  }

  getMenus(req, res) {
    res.send(MenusServices.getMeals());
  }

  getMenuByTimeStamp(req, res) {
    const timeStamp = parseInt(req.params.timeStamp, 10);
    const menu = MenusServices.getMealByTimeStamp(timeStamp);

    if (menu) {
      res.send(menu);
    } else {
      res.sendStatus(404).send('Menu not found');
    }
  }

  postMenu(req, res) {
    const meal = req.body;
    if (MenusServices.addMeal(meal)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400).send('Error adding menu');
    }
  }

  putMenu(req, res) {
    const timeStamp = parseInt(req.params.timeStamp, 10);
    const menu = req.body;

    if (MenusServices.updateMenu(timeStamp, menu)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400).send('Error updating menu');
    }
  }
}

module.exports = MenusController;
