import { useState } from 'react';
import { categories, money } from '../data';
export default function Menu({ menu, addToCart }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [dietary, setDietary] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');
  const visible = menu.filter(item => item.name.toLowerCase().includes(search.toLowerCase().trim()) && (category === 'All' || item.category === category) && (dietary === 'All' || item.dietary.includes(dietary)) && (maxPrice === '' || item.price <= Number(maxPrice)));
  return <><section className="hero"><p className="eyebrow">WELCOME TO MAPLE TABLE</p><h1>A little comfort.<br />A lot of flavour.</h1><p>Fresh favourites for your table, or wherever you call home.</p></section>
    <section aria-label="Menu filters" className="filters"><label>Search menu<input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Try pasta or salad" /></label><label>Category<select value={category} onChange={e => setCategory(e.target.value)}>{['All', ...categories].map(value => <option key={value}>{value}</option>)}</select></label><label>Dietary preference<select value={dietary} onChange={e => setDietary(e.target.value)}>{['All', 'Vegetarian', 'Vegan', 'Gluten-free'].map(value => <option key={value}>{value}</option>)}</select></label><label>Maximum price ($)<input type="number" min="0" step="0.01" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} /></label><button className="secondary" onClick={() => { setSearch(''); setCategory('All'); setDietary('All'); setMaxPrice(''); }}>Clear filters</button></section>
    <h2>Our menu <span className="muted">/ {visible.length} dishes</span></h2>
    {visible.length === 0 ? <p className="empty">No dishes match your filters. Try another search.</p> : categories.map(group => {
      const items = visible.filter(item => item.category === group);
      return items.length > 0 && <section key={group}><h3>{group}</h3><div className="grid">{items.map(item => <article className="card" key={item.id}><div className="card-top"><span className="eyebrow">{item.category}</span><strong>{money(item.price)}</strong></div><h3>{item.name}</h3><p>{item.description}</p><p className="ingredients"><strong>Ingredients:</strong> {item.ingredients}</p><div className="tags">{item.dietary.map(tag => <span key={tag}>{tag}</span>)}</div><button disabled={!item.available} onClick={() => addToCart(item)}>{item.available ? 'Add to cart' : 'Unavailable'}</button></article>)}</div></section>;
    })}</>;
}
