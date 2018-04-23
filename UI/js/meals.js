var meals = [
	{
		"name": "Chicken Pa-Naeng - Beef", 
		"description": "Red Curry with Peanut Sauce, Bamboo Shoot, Ginger, Bell Pepper, Green Bean, Galanga and Lemon Leaves. Choice of Chicken, Beef, Pork, Tofu or Shrimp.", 
		"price": 2300,
		"category": "Hot Meal",
		"image": "1.jpg"
	},
	{
		"name": "Squash Curry - Tofu",
		"description": "Red and Yellow Curry Coconut Milk with Squash, Potatoes, Green Bean & Bamboo Shoot. Choice of Chicken, Beef, Pork, Tofu or Shrimp.",
		"price": 1200,
		"category": "Lunch",
		"image": "2.jpg"
	},
	{
		"name": "Vegetable Fried Rice (Khao Phat Phak)",
		"description": "Stir Fried with Eggs, Chinese Broccoli, Tofu and Onion. Served with Cucumber and Lime.",
		"price": 1500,
		"category": "Snack",
		"image": "3.jpg"
	},
	{
		"name": "Shrimp Frid Rice",
		"description": "Stir Fried Rice with Shrimp, Egg, Peas, Corn, Bean, Carrots, Onion. Topped with Cucumber and Lime.",
		"price": 2000,
		"category": "Snack",
		"image": "4.jpg"
	},
	{
		"name": "Special Combination Fried Rice",
		"description": "Stir Fried Rice with Beef, Chicken, Pork, Shrimp, Chinese Sausage & Egg",
		"price": 1400,
		"category": "Hot Meal",
		"image": "5.jpg"
	},
	{
		"name": "Yum - Pork",
		"description": "Slice Thin Beef Mixed With Lettuce, Thread Noodle, Lime, Onion, Carrot, Cilantro. Topped with Peanuts. Choice of Beef, Pork or Seafood.",
		"price": 2100,
		"category": "Hot Meal",
		"image": "6.jpg"
	},
	{
		"name": "Yum - Seafood",
		"description": "Slice Thin Beef Mixed With Lettuce, Thread Noodle, Lime, Onion, Carrot, Cilantro. Topped with Peanuts. Choice of Beef, Pork or Seafood.",
		"price": 1000,
		"category": "Lunch",
		"image": "7.jpg"
	},
	{
		"name": "Larb - Ground Beef",
		"description": "Ground Beef/Chicken/Pork mixed with Lemon Grass, Lemon Leaves, Onion, Cilantro, Green Onion, Basicl, and Ground Rice. Served with Cucumber and Cabbage/Lettuce.",
		"price": 1300,
		"category": "Snack",
		"image": "8.jpg"
	},
	{
		"name": "Papaya Salad",
		"description": "Shredded Papaya, Lime, Pepper, Tomato, Dried Shrimp, Long Bean, Thai Eggplant, Fish Sauce, Peanuts. Served with Cabbage or Lettuce",
		"price": 1000,
		"category": "Snack",
		"image": "9.jpg"
	},
	{
		"name": "Larb - Chicken",
		"description": "Ground Beef/Chicken/Pork mixed with Lemon Grass, Lemon Leaves, Onion, Cilantro, Green Onion, Basicl, and Ground Rice. Served with Cucumber and Cabbage/Lettuce.",
		"price": 1200,
		"category": "Snack",
		"image": "10.jpg"
	}
];

//Sorting Compare Algorithm
function compareA_Z(a,b) {
    if (a.name < b.name)
        return -1;
    if (a.name > b.name)
        return 1;
    return 0;
}

//Sorting meals
meals = meals.sort(compareA_Z);


