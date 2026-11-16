import { useState } from 'react';
import { localDate, newId } from '../data';
export default function Reservations({ reservations, setReservations, setNotice }) {
  const [type, setType] = useState('Table');
  const [error, setError] = useState('');
  function book(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = Object.fromEntries(form);
    const start = new Date(`${data.date}T${data.time}`);
    if (!data.name.trim() || !Number.isFinite(start.getTime()) || start <= new Date() || data.time < '11:00' || data.time > '20:00' || !Number.isInteger(Number(data.guests)) || Number(data.guests) < 1 || Number(data.guests) > 20) { setError('Enter a future booking between 11:00 and 20:00 for 1–20 guests.'); return; }
    // Each reservation occupies a two-hour slot; the demo has 20 seats.
    const overlapping = reservations.filter(item => item.status !== 'Cancelled' && Math.abs(new Date(`${item.date}T${item.time}`) - start) < 2 * 60 * 60 * 1000);
    if (overlapping.reduce((sum, item) => sum + Number(item.guests), 0) + Number(data.guests) > 20) { setError('That time is fully booked. Choose another time or date.'); return; }
    const booking = { ...data, name: data.name.trim(), guests: Number(data.guests), type, id: newId(), status: 'Pending' };
    setReservations([booking, ...reservations]); setError(''); setNotice(`Reservation received: ${booking.id.slice(0, 8)}. Your confirmation is shown below; admin approval is pending.`); event.target.reset(); setType('Table');
  }
  return <section><p className="eyebrow">MAKE TIME FOR GOOD COMPANY</p><h1>Book a table or event</h1><div className="two-column"><form onSubmit={book} className="panel"><h2>Reservation details</h2><label>Name<input name="name" required maxLength="80" /></label><label>Email<input name="email" type="email" required maxLength="120" /></label><div className="form-row"><label>Date<input name="date" type="date" min={localDate()} required /></label><label>Time<input name="time" type="time" min="11:00" max="20:00" step="1800" required /></label></div><label>Guests<input name="guests" type="number" min="1" max="20" required defaultValue="2" /></label><label>Booking type<select value={type} onChange={e => setType(e.target.value)}><option>Table</option><option>Birthday party</option><option>Corporate gathering</option></select></label>{type !== 'Table' && <label>Event requirements / menu preferences<textarea name="requirements" maxLength="500" /></label>}<p className="muted">Bookings last two hours. Last seating is at 20:00. Confirmation appears here; email is simulated.</p>{error && <p className="error" role="alert">{error}</p>}<button>Request reservation</button></form><div><h2>Your reservations</h2>{reservations.length === 0 ? <p className="empty">Your next gathering starts here.</p> : reservations.map(item => <article className="panel" key={item.id}><span className="badge">{item.status}</span><h3>{item.type} · {item.id.slice(0, 8)}</h3><p>{item.date} at {item.time} · {item.guests} guests</p><p>{item.name} · {item.email}</p>{item.requirements && <p>{item.requirements}</p>}{item.status !== 'Cancelled' && <button className="secondary" onClick={() => { setReservations(reservations.map(booking => booking.id === item.id ? { ...booking, status: 'Cancelled' } : booking)); setNotice('Reservation cancelled.'); }}>Cancel reservation</button>}</article>)}</div></div></section>;
}
