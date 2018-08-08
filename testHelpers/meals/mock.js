const getMealsMock = (userId) => {
  const meals = [];
  for (let i = 0; i < 40; i += 1) {
    meals.push({
      name: 'Malvaceae',
      price: 40 * i,
      userId,
      description: 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.',
      category: 'dolor sit',
    });
  }
  return meals;
};

export default getMealsMock;
