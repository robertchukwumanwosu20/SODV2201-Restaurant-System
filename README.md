# Maple Table — Assignment 1

React frontend for the Smart Restaurant Management System (SODV2201).

## Run in VS Code

Install Node.js 20.19+ (or 22.12+). Open this extracted folder in VS Code, then use its terminal:

```bash
npm ci
npm run dev
```

Open the Local URL printed in the terminal. Stop the server with Control+C. Do not open index.html directly.

```bash
npm run build
npm run preview
npm test
```

The build command creates `dist`. The preview command serves that production build. The included tests check the simulated assistant.

## Features

- Menu grouped into starters, mains, desserts and beverages, with descriptions, ingredients and prices.
- Combined search, category, dietary and maximum-price filters.
- Cart with quantities, removal, pickup/delivery checkout and confirmation.
- Order history and status tracking; GST and delivery charges shown separately.
- Table, birthday and corporate reservations, event notes and onscreen confirmation.
- Admin menu CRUD and availability controls, incoming orders and reservation approval/cancellation.
- Local menu assistant covering all six example question types, using actual menu and previous-order data.
- Responsive CSS, labelled inputs, empty states and validation messages.

## Code layout

- `src/App.jsx`: shared state, navigation, routes and notifications.
- `src/components/`: separate menu, cart, orders, reservations, admin and assistant screens.
- `src/data.js`: starter menu and formatting helpers.
- `src/assistant.js`: local question/response rules.
- `src/useLocalStorage.js`: load/save state with error handling.
- `src/style.css`: shared styles and mobile breakpoints.

Props pass data and callbacks to child components. useState handles local form/filter state. The custom hook uses useEffect to save changes. Routes use HashRouter so links also work on static hosting. Arrays use map with stable IDs; conditional rendering controls delivery fields, event notes and empty states. The assistant's conversation is temporary; saved restaurant records remain after refresh.

## Frontend scope

All records are stored in this browser's localStorage. Use one tab for the demo; separate browsers do not share data. This is a shared demo dataset, not private customer accounts. Admin is openly accessible and is explicitly labelled as a demo. Node/Express, MySQL/MongoDB, real authentication and server authorization are Assignment 2 work. Optional customer accounts and analytics are omitted. No real email, payment, delivery or external AI requests are made. No API key is needed.

Reservations occupy two hours with a simplified 20-seat capacity check, open 11:00–22:00, last seating 20:00. Pending reservations also hold capacity. Dietary tags describe the sample ingredients; allergy questions should be checked with restaurant staff.

To start fresh, open browser developer tools, go to Application/Storage → Local Storage and remove only `srms-menu`, `srms-cart`, `srms-orders`, `srms-reservations`, then refresh. This deletes this demo's saved records.

## Verification

Production build: passed. Five automated assistant logic tests: passed. A full browser test was attempted but Chromium could not start due to the execution environment's socket restrictions. Visual layout and end-to-end interactions still need local checking using DEMO_GUIDE.md. Do not treat the automated tests as complete UI coverage.

## Submission

Submit the completed project files, your GitHub repository link and a camera-on demonstration video. See DEMO_GUIDE.md. The instructor assesses your explanations and genuine development history as well as the finished application. This ZIP does not contain a video or fabricated Git history.
