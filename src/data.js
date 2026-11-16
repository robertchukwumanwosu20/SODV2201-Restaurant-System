export const categories = ['Starters', 'Mains', 'Desserts', 'Beverages'];
export const initialMenu = [
  { id: 'm1', name: 'Garden Salad', category: 'Starters', description: 'A crisp, fresh start to your meal.', ingredients: 'Lettuce, tomato, cucumber, olive oil', price: 8.99, dietary: ['Vegetarian', 'Vegan', 'Gluten-free'], available: true },
  { id: 'm2', name: 'Garlic Bread', category: 'Starters', description: 'Toasted bread with garlic butter.', ingredients: 'Wheat bread, butter, garlic, parsley', price: 5.99, dietary: ['Vegetarian'], available: true },
  { id: 'm3', name: 'Chicken Alfredo', category: 'Mains', description: 'Our daily special: creamy pasta and grilled chicken.', ingredients: 'Wheat pasta, chicken, cream, parmesan, garlic', price: 18.99, dietary: [], available: true },
  { id: 'm4', name: 'Vegetable Pasta', category: 'Mains', description: 'Gluten-free pasta with seasonal vegetables.', ingredients: 'Gluten-free pasta, zucchini, pepper, tomato, olive oil', price: 16.99, dietary: ['Vegetarian', 'Vegan', 'Gluten-free'], available: true },
  { id: 'm5', name: 'Margherita Pizza', category: 'Mains', description: 'Classic tomato, mozzarella and fresh basil.', ingredients: 'Wheat dough, tomato, mozzarella, basil', price: 17.99, dietary: ['Vegetarian'], available: true },
  { id: 'm6', name: 'Chocolate Lava Cake', category: 'Desserts', description: 'Our popular dessert, with a warm chocolate centre.', ingredients: 'Wheat flour, egg, milk, butter, chocolate', price: 7.99, dietary: ['Vegetarian'], available: true },
  { id: 'm7', name: 'Berry Sorbet', category: 'Desserts', description: 'A light and refreshing berry finish.', ingredients: 'Berries, sugar, lemon, water', price: 5.99, dietary: ['Vegetarian', 'Vegan', 'Gluten-free'], available: true },
  { id: 'm8', name: 'Lemon Iced Tea', category: 'Beverages', description: 'Freshly brewed tea served over ice.', ingredients: 'Black tea, lemon, sugar, water', price: 3.99, dietary: ['Vegetarian', 'Vegan', 'Gluten-free'], available: true }
];
export const money = value => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value);
export const newId = () => crypto.randomUUID();
export function localDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}
