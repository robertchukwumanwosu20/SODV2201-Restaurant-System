import test from 'node:test';
import assert from 'node:assert/strict';
import { getReply, questions } from '../src/assistant.js';
import { initialMenu } from '../src/data.js';

test('all six suggested questions return useful answers', () => {
  for (const question of questions) assert.ok(getReply(question, initialMenu, []).length > 20);
});
test('last order is based on order data, not the sample answer', () => {
  assert.match(getReply('What did I order last time?', initialMenu, []), /not placed/);
  const orders = [{ items: [{ id: 'm1', name: 'Garden Salad', quantity: 2 }] }];
  assert.match(getReply('What did I order last time?', initialMenu, orders), /2 × Garden Salad/);
});
test('dietary answers respect availability and current prices', () => {
  const menu = initialMenu.map(item => item.id === 'm4' ? { ...item, available: false } : item);
  const reply = getReply('gluten-free options', menu, []);
  assert.ok(!reply.includes('Vegetable Pasta'));
  assert.match(reply, /Garden Salad/);
  assert.match(reply, /8.99/);
});
test('recommendations use previous items when still available', () => {
  assert.match(getReply('recommend', initialMenu, [{ items: [{ id: 'm7' }] }]), /Berry Sorbet/);
});
test('unknown requests and empty menus have fallback responses', () => {
  assert.match(getReply('something unknown', [], []), /I can help/);
  assert.match(getReply('vegetarian', [], []), /No matching dishes/);
});
