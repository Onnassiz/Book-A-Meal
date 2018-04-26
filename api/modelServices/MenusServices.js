
const menus = require('../mockups/menus');

class MenusServices {
  constructor(_menus) {
    this.menus = _menus;
  }

  getMenus() {
    return this.menus;
  }

  getMenuByTimeStamp(timestamp) {
    return this.menus.find(x => x.timestamp === timestamp);
  }

  addMenu(menu) {
    if (menu) {
      const index = this.menus.findIndex(x => x.timestamp === menu.timestamp);
      if (index === -1) {
        this.menus.push(menu);
        return true;
      }
      return false;
    }
    return false;
  }

  updateMenu(timestamp, menu) {
    if (menu) {
      const index = this.menus.findIndex(x => x.timestamp === menu.timestamp);
      if (index !== -1) {
        this.menus[index] = menu;
        return true;
      }
      return false;
    }
    return false;
  }
}

module.exports = new MenusServices(menus);
