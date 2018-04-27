const { expect } = require('chai');
const { describe, it } = require('mocha');
const menus = require('../api/mockups/menus');

const MenusServices = require('../api/modelServices/MenusServices');

describe('Menu Services', () => {
  describe('Constructor', () => {
    it('menus should be an array of menus', () => {
      expect(Array.isArray(MenusServices.menus)).to.equal(true);
    });
  });

  describe('Get all menus', () => {
    it('should return all menus', () => {
      expect(MenusServices.getMenus()).to.equal(menus);
    });
  });

  describe('Get menu by timeStamp', () => {
    it('should return menu for a specified timeStamp', () => {
      expect(MenusServices.getMenuByTimeStamp(1525046400)).to.equal(menus[1]);
    });
  });

  describe('Add to menus', () => {
    it('should increase the menu length by one', () => {
      const menusLength = MenusServices.getMenus().length;
      const menu = {
        name: 'Sunday\'s blast',
        timestamp: 1524962222,
        meals: [
          {
            id: 6,
            name: 'Yum - Pork',
            description: 'Slice Thin Beef Mixed With Lettuce, Thread Noodle, Lime, Onion, Carrot, Cilantro. Topped with Peanuts. Choice of Beef, Pork or Seafood.',
            price: 2100,
            category: 'Hot Meal',
            image: '6.jpg',
          },
          {
            id: 4,
            name: 'Shrimp Frid Rice',
            description: 'Stir Fried Rice with Shrimp, Egg, Peas, Corn, Bean, Carrots, Onion. Topped with Cucumber and Lime.',
            price: 2000,
            category: 'Snack',
            image: '4.jpg',
          },
        ],
      };

      MenusServices.addMenu(menu);
      expect(MenusServices.getMenus().length).to.equal(menusLength + 1);
    });

    it('should return false if menu is empty', () => {
      expect(MenusServices.addMenu({})).to.equal(false);
    });

    it('should return false if menu for that day already exist', () => {
      const menu = {
        name: 'Sunday\'s blast',
        timestamp: 1524873600,
        meals: [
          {
            id: 6,
            name: 'Yum - Pork',
            description: 'Slice Thin Beef Mixed With Lettuce, Thread Noodle, Lime, Onion, Carrot, Cilantro. Topped with Peanuts. Choice of Beef, Pork or Seafood.',
            price: 2100,
            category: 'Hot Meal',
            image: '6.jpg',
          },
          {
            id: 4,
            name: 'Shrimp Frid Rice',
            description: 'Stir Fried Rice with Shrimp, Egg, Peas, Corn, Bean, Carrots, Onion. Topped with Cucumber and Lime.',
            price: 2000,
            category: 'Snack',
            image: '4.jpg',
          },
        ],
      };
      expect(MenusServices.addMenu(menu)).to.equal(false);
    });
  });

  describe('Update menu', () => {
    it('should update the value of a specified menu', () => {
      const menu = {
        name: 'Sunday\'s bread',
        timestamp: 1525046400,
        meals: [
          {
            id: 6,
            name: 'Yum - Pork',
            description: 'Slice Thin Beef Mixed With Lettuce, Thread Noodle, Lime, Onion, Carrot, Cilantro. Topped with Peanuts. Choice of Beef, Pork or Seafood.',
            price: 2100,
            category: 'Hot Meal',
            image: '6.jpg',
          },
          {
            id: 4,
            name: 'Shrimp Frid Rice',
            description: 'Stir Fried Rice with Shrimp, Egg, Peas, Corn, Bean, Carrots, Onion. Topped with Cucumber and Lime.',
            price: 2000,
            category: 'Snack',
            image: '4.jpg',
          },
        ],
      };
      expect(MenusServices.updateMenu(1525046400, menu)).to.equal(true);
    });

    it('should return false if menu is empty', () => {
      expect(MenusServices.updateMenu(1524960000, {})).to.equal(false);
    });

    it('should return false if timeStamp is wrong', () => {
      expect(MenusServices.updateMenu(111111111, { name: 'Name', timestamp: 111111111, menu: [] })).to.equal(false);
    });
  });
});

