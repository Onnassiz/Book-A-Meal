
/* eslint class-methods-use-this: ["off"] */
/* eslint object-curly-newline: ["off"] */

const MenusServices = require('../modelServices/MenusServices');

class MenusController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/menus', this.getMenus.bind(this));
    this.router.get('/menus/:timeStamp', this.getMenuByTimeStamp.bind(this));
    this.router.post('/menus', this.postMenu.bind(this));
    this.router.put('/menus/:timeStamp', this.putMenu.bind(this));
  }

  getMenus(req, res) {
    res.send(MenusServices.getMenus());
  }

  getMenuByTimeStamp(req, res) {
    const timeStamp = parseInt(req.params.timeStamp, 10);
    const menu = MenusServices.getMenuByTimeStamp(timeStamp);

    if (menu) {
      res.send(menu);
    } else {
      res.status(404).send('Menu not found');
    }
  }

  postMenu(req, res) {
    const menu = req.body;
    if (MenusServices.addMenu(menu)) {
      res.sendStatus(200);
    } else {
      res.status(400).send('Error adding menu');
    }
  }

  putMenu(req, res) {
    const timeStamp = parseInt(req.params.timeStamp, 10);
    const menu = req.body;


    if (MenusServices.updateMenu(timeStamp, menu)) {
      res.sendStatus(200);
    } else {
      res.status(400).send('Error updating menu');
    }
  }
}

module.exports = MenusController;
