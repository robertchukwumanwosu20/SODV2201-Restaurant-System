import { useState } from 'react';
import { NavLink, Routes, Route, Link } from 'react-router-dom';
import useLocalStorage from './useLocalStorage';
import { initialMenu } from './data';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Reservations from './components/Reservations';
import Admin from './components/Admin';
import Assistant from './components/Assistant';
import Orders from './components/Orders';

export default function App() {
  const [menu, setMenu, menuError] = useLocalStorage('srms-menu', initialMenu);
  const [cart, setCart, cartError] = useLocalStorage('srms-cart', []);
  const [orders, setOrders, orderError] = useLocalStorage('srms-orders', []);
  const [reservations, setReservations, reservationError] = useLocalStorage('srms-reservations', []);
  const [notice, setNotice] = useState('');
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  function addToCart(item) {
    setCart(current => {
      const found = current.find(line => line.id === item.id);
      return found ? current.map(line => line.id === item.id ? { ...line, quantity: Math.min(99, line.quantity + 1) } : line) : [...current, { id: item.id, quantity: 1 }];
    });
    setNotice(`${item.name} added to your cart.`);
  }
  return <>
    <header><Link className="brand" to="/">Maple<span>Table</span><small>GOOD FOOD. GOOD COMPANY.</small></Link><nav aria-label="Main navigation">
      <NavLink to="/" end>Menu</NavLink><NavLink to="/reservations">Reservations</NavLink><NavLink to="/orders">My orders</NavLink><NavLink to="/assistant">Menu assistant</NavLink><NavLink to="/cart">Cart ({count})</NavLink><NavLink to="/admin">Admin demo</NavLink>
    </nav></header>
    <main>
      <p className="demo">Assignment 1 · Frontend demo · Data stays in this browser. No real orders, emails or payments are sent.</p>
      {[menuError, cartError, orderError, reservationError].filter(Boolean).slice(0, 1).map(error => <p role="alert" className="error" key={error}>{error}</p>)}
      <div role="status" className={notice ? 'notice' : ''}>{notice && <>{notice} <button className="text-button" onClick={() => setNotice('')}>Dismiss</button></>}</div>
      <Routes>
        <Route path="/" element={<Menu menu={menu} addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart {...{ menu, cart, setCart, orders, setOrders, setNotice }} />} />
        <Route path="/orders" element={<Orders orders={orders} />} />
        <Route path="/reservations" element={<Reservations {...{ reservations, setReservations, setNotice }} />} />
        <Route path="/assistant" element={<Assistant menu={menu} orders={orders} />} />
        <Route path="/admin" element={<Admin {...{ menu, setMenu, orders, setOrders, reservations, setReservations, setNotice }} />} />
        <Route path="*" element={<section><h1>Page not found</h1><Link to="/">Back to the menu</Link></section>} />
      </Routes>
    </main><footer>Maple Table · Open daily, 11:00–22:00 · Prices in CAD</footer>
  </>;
}
