
/* eslint class-methods-use-this: ["off"] */
/* eslint object-curly-newline: ["off"] */

const MenusServices = require('../modelServices/MenusServices');

class MenusController {
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
      res.status(200).send('Menu successfully added');
    } else {
      res.status(400).send('Error adding menu');
    }
  }

  putMenu(req, res) {
    const timeStamp = parseInt(req.params.timeStamp, 10);
    const menu = req.body;


    if (MenusServices.updateMenu(timeStamp, menu)) {
      res.status(200).send('Menu successfully updated');
    } else {
      res.status(400).send('Error updating menu');
    }
  }
}

module.exports = new MenusController();
