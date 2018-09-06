export const singleMeal = {
  id: '84c6d80c-3d4a-4772-856c-0b3825bc5333',
  name: 'Malvaceae',
  price: 400,
  totalPrice: 2000,
  units: 2,
  caterer: 'Ben',
  userId: '2794fddd-14f3-4ec9-a1dc-88ad2bc649da',
  description: 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.',
  imageUrl: 'http://thisImage.jpeg',
  category: 'dolor sit',
};

export const getMealsMock = (limit = 10) => {
  const meals = [];
  for (let i = 0; i < limit - 1; i += 1) {
    meals.push({
      id: `id${i}`,
      name: 'Malvaceae',
      caterer: 'Ben',
      totalPrice: 2000,
      units: 2,
      price: 40 * i,
      userId: '84c6d80c-3d4a-4772-856c-0b3825bc537e',
      description: 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.',
      category: 'dolor sit',
    });
  }
  meals.push(singleMeal);
  return meals;
};
