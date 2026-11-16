import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { money, newId } from '../data';
export default function Cart({ menu, cart, setCart, orders, setOrders, setNotice }) {
  const [method, setMethod] = useState('Pickup');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const lines = cart.map(line => ({ ...line, item: menu.find(item => item.id === line.id) }));
  const subtotal = lines.reduce((sum, line) => sum + (line.item?.price || 0) * line.quantity, 0);
  const delivery = method === 'Delivery' ? 4.99 : 0;
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  function checkout(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    if (lines.some(line => !line.item?.available || !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 99)) { setError('Remove unavailable dishes and check quantities before ordering.'); return; }
    if (!form.get('name').trim() || !form.get('phone').trim() || (method === 'Delivery' && !form.get('address').trim())) { setError('Complete all required contact and delivery fields.'); return; }
    const order = { id: newId(), createdAt: new Date().toISOString(), name: form.get('name').trim(), phone: form.get('phone').trim(), address: method === 'Delivery' ? form.get('address').trim() : '', method, status: 'Received', items: lines.map(line => ({ id: line.id, name: line.item.name, price: line.item.price, quantity: line.quantity })), subtotal, tax, delivery, total: subtotal + tax + delivery };
    setOrders([order, ...orders]); setCart([]); setNotice(`Order confirmed: ${order.id.slice(0, 8)}. Track updates in My orders.`); navigate('/orders');
  }
  return <section><p className="eyebrow">YOUR NEXT GOOD MEAL</p><h1>Your cart</h1>{cart.length === 0 ? <p className="empty">Your cart is empty. <Link to="/">Browse the menu</Link>.</p> : <div className="two-column"><div>{lines.map(line => <article className="cart-line" key={line.id}><div><h3>{line.item?.name || 'Deleted menu item'}</h3><p>{line.item?.available ? money(line.item.price) : 'Unavailable — please remove'}</p></div><label>Quantity<input aria-label={`Quantity for ${line.item?.name || 'deleted item'}`} type="number" min="1" max="99" value={line.quantity} onChange={e => { const quantity = Number(e.target.value); if (Number.isInteger(quantity) && quantity >= 1 && quantity <= 99) setCart(cart.map(item => item.id === line.id ? { ...item, quantity } : item)); }} /></label><button className="secondary" onClick={() => setCart(cart.filter(item => item.id !== line.id))}>Remove</button></article>)}</div><form className="panel" onSubmit={checkout}><h2>Checkout</h2><label>Order type<select value={method} onChange={e => setMethod(e.target.value)}><option>Pickup</option><option>Delivery</option></select></label><label>Name<input name="name" required maxLength="80" /></label><label>Phone<input name="phone" type="tel" required pattern="[+0-9() .-]{7,20}" title="Enter a phone number with 7 to 20 characters." /></label>{method === 'Delivery' && <label>Delivery address<input name="address" required maxLength="200" /></label>}<p>Subtotal <strong>{money(subtotal)}</strong></p><p>GST (5%) <strong>{money(tax)}</strong></p><p>Delivery <strong>{money(delivery)}</strong></p><p className="total">Total {money(subtotal + tax + delivery)}</p><p className="muted">Payment and delivery are simulated.</p>{error && <p role="alert" className="error">{error}</p>}<button>Confirm order</button></form></div>}</section>;
}
