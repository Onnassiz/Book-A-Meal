import { user, meal, menu, order, address, profile } from '../api/models';

const uuidv4 = require('uuid/v4');

class TestUtil {
	constructor() {
		this.meal_1_Id = uuidv4();
		this.meal_2_Id = uuidv4();
	}

	deleteUser(email, done) {
		user.destroy({
			where: { email },
		}).then(() => {
			done();
		});
	}

	insertMeals(done, callDone) {
		user.findOne({ where: { email: 'caterer@gmail.com' } }).then((usr) => {
			meal.bulkCreate([
				{
					id: uuidv4(),
					name: 'Fire bons',
					price: 2000,
					category: 'Hot meal',
					userId: usr.id,
					imageUrl: 'http://bens.com',
				},
				{
					id: uuidv4(),
					name: 'Chicken Salad',
					price: 4000,
					category: 'Hot meal',
					userId: usr.id,
					imageUrl: 'http://bens.com',
				},
			]).then(() => {
				if (callDone) {
					done();
				}
			});
		});
	}

	insertMenus(done) {
		this.insertMeals(done, false);
		user.findOne({ where: { email: 'customer@gmail.com' } }).then((usr) => {
			menu.bulkCreate([
				{
					name: 'Monday Special',
					unixTime: 1525564800,
					userId: usr.id,
					meals: [
						{
							mealId: this.meal_1_Id,
						},
						{
							mealId: this.meal_2_Id,
						},
					],
				},
				{
					name: 'Tuesday Special',
					unixTime: 1525651200,
					userId: usr.id,
					meals: [
						{
							mealId: this.meal_1_Id,
						},
						{
							mealId: this.meal_2_Id,
						},
					],
				},
			]).then(() => {
				done();
			});
		});
	}

	insertOrders(done) {
		this.insertMeals(done, false);
		user.findOne({ where: { email: 'customer@gmail.com' } }).then((usr) => {
			order.bulkCreate([
				{
					amount: 1525,
					userId: usr.id,
					meals: [
						{
							mealId: this.meal_1_Id,
						},
						{
							mealId: this.meal_2_Id,
						},
					],
				},
				{
					amount: 2100,
					userId: usr.id,
					meals: [
						{
							mealId: this.meal_1_Id,
						},
						{
							mealId: this.meal_2_Id,
						},
					],
				},
			]).then(() => {
				done();
			});
		});
	}

	insertAddresses(done) {
		user.findOne({ where: { email: 'customer@gmail.com' } }).then((usr) => {
			address.bulkCreate([
				{
					streetAddress: 'Alen Ave',
					city: 'Ikeja',
					state: 'Lagos',
					userId: usr.id,
				},
				{
					streetAddress: 'Alen Ave',
					city: 'Zaria',
					state: 'Kaduna',
					userId: usr.id,
				},
			]).then(() => {
				done();
			});
		});
	}

	insertProfile(done) {
		user.findOne({ where: { email: 'customer@gmail.com' } }).then((usr) => {
			profile.bulkCreate([
				{
					businessName: 'Just eat',
					contact: '080321231232',
					email: 'justeat@gmail.com',
					mission: 'Feeding the richest',
					banner: 'http://banner.com',
					userId: usr.id,
				},
			]).then(() => {
				done();
			});
		});
	}

	deleteMeals(done) {
		meal.destroy({
			where: {},
		}).then(() => {
			done();
		});
	}

	deleteProfiles(done) {
		profile.destroy({
			where: {},
		}).then(() => {
			done();
		});
	}

	deleteMenus(done) {
		menu.destroy({
			where: {},
		}).then(() => {
		});
		this.deleteMeals(done);
	}

	deleteOrders(done) {
		order.destroy({
			where: {},
		}).then(() => {
		});
		this.deleteMeals(done);
	}

	deleteAddresses(done) {
		address.destroy({
			where: {},
		}).then(() => {
		});
		this.deleteMeals(done);
	}

	getMealId() {
		return meal.findOne().then((ml) => {
			return ml.id;
		});
	}

	getProfileId() {
		return profile.findOne().then((ml) => {
			return ml.id;
		});
	}

	getAddressId() {
		return address.findOne().then((adr) => {
			return adr.id;
		});
	}

	getMenuId() {
		return menu.findOne().then((mn) => {
			return mn.id;
		});
	}

	getOrderId() {
		return order.findOne().then((ord) => {
			return ord.id;
		});
	}

	getUserId() {
		return user.findOne({ where: { email: 'caterer@gmail.com' } }).then((usr) => {
			return usr.id;
		});
	}

	getCustomerId() {
		return user.findOne({ where: { email: 'customer@gmail.com' } }).then((usr) => {
			return usr.id;
		});
	}

	getCustomerIdAndMealIds() {
		return this.getCustomerId().then((id) => {
			return meal.findAll().then((mls) => {
				return {
					id,
					meal_1_Id: mls[0].id,
					meal_2_Id: mls[1].id,
				};
			});
		});
	}
}

export default new TestUtil();
