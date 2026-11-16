import { money } from './data.js';
export const questions = ["What are today's specials?", 'What vegetarian meals do you have?', 'What do you recommend?', 'Do you have gluten-free options?', 'What is the most popular dessert?', 'What did I order last time?'];
export function getReply(question, menu, orders) {
  const text = question.toLowerCase();
  const available = menu.filter(item => item.available);
  const describe = items => items.length ? items.map(item => `${item.name} (${money(item.price)})`).join(', ') : 'No matching dishes are available right now.';
  if (/last|previous|history/.test(text)) return orders.length ? `Your last order was ${orders[0].items.map(item => `${item.quantity} × ${item.name}`).join(', ')}.` : 'You have not placed an order in this browser yet.';
  if (/gluten/.test(text)) return describe(available.filter(item => item.dietary.includes('Gluten-free')));
  if (/vegetarian|vegan/.test(text)) return describe(available.filter(item => item.dietary.includes(text.includes('vegan') ? 'Vegan' : 'Vegetarian')));
  if (/dessert/.test(text)) return describe(available.filter(item => item.name === 'Chocolate Lava Cake').length ? available.filter(item => item.name === 'Chocolate Lava Cake') : available.filter(item => item.category === 'Desserts'));
  if (/special/.test(text)) return `Today's featured dish: ${describe(available.filter(item => item.name === 'Chicken Alfredo'))}`;
  if (/recommend|popular/.test(text)) {
    const previousIds = orders.flatMap(order => order.items.map(item => item.id));
    const favourites = available.filter(item => previousIds.includes(item.id));
    return `Try ${describe(favourites.length ? favourites.slice(0, 2) : available.filter(item => item.category === 'Mains').slice(0, 2))}`;
  }
  if (/hour|open/.test(text)) return 'We are open daily from 11:00 to 22:00. The last reservation starts at 20:00.';
  if (/reserv|birthday|corporate/.test(text)) return 'Use Reservations to request a table, birthday party or corporate gathering for up to 20 guests.';
  if (/ingredient|allerg/.test(text)) return 'Each menu card lists ingredients. Tell restaurant staff about allergies before ordering; dietary tags do not guarantee an allergen-free kitchen.';
  return 'I can help with specials, recommendations, vegetarian or gluten-free meals, desserts, your previous order, hours and reservations. Try one of the questions above.';
}
