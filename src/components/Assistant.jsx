import { useState } from 'react';
import { questions, getReply } from '../assistant';
export default function Assistant({ menu, orders }) {
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Hello! What sounds good today?' }]);
  const [question, setQuestion] = useState('');
  function ask(text) {
    if (!text.trim()) return;
    setMessages(current => [...current, { role: 'customer', text: text.trim() }, { role: 'assistant', text: getReply(text, menu, orders) }]); setQuestion('');
  }
  return <section className="chat-page"><p className="eyebrow">A LITTLE HELP CHOOSING</p><h1>Menu assistant</h1><p>Local simulated AI assistant: keyword rules and menu data, with no external AI service.</p><div className="suggestions">{questions.map(text => <button className="secondary" key={text} onClick={() => ask(text)}>{text}</button>)}</div><div className="panel chat" role="log" aria-label="Conversation" aria-live="polite">{messages.map((message, index) => <div className={`message ${message.role}`} key={index}><strong>{message.role === 'customer' ? 'You' : 'Menu assistant'}</strong><p>{message.text}</p></div>)}</div><form className="chat-form" onSubmit={e => { e.preventDefault(); ask(question); }}><label>Your question<input value={question} maxLength="300" onChange={e => setQuestion(e.target.value)} required placeholder="Ask about the menu…" /></label><button>Send</button></form></section>;
}
