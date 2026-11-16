# Local checks and camera-on demo guide

Read the code, run these checks yourself, and explain it in your own words. Describe only development and debugging work that you actually performed. Keep your camera on throughout the recording, as required by the assignment.

## Before recording

1. Extract the ZIP, open the project folder in VS Code, run `npm ci` and `npm run dev`.
2. Run `npm test` and `npm run build`. Confirm there are no errors in the browser console.
3. Run the checks below. Fix any issue you find before recording.
4. Prepare your real GitHub URL. Do not submit the guide as a substitute for your video.

## Feature checks and suggested demonstration order

| Step | Action | Expected result / explanation |
| --- | --- | --- |
| 1 | Introduce Maple Table and show the folders in VS Code. | React frontend for customer orders and admin management; explain that storage and notifications are simulated. |
| 2 | Show all four menu categories. Search for pasta. Clear filters. Select Vegan, then set maximum price to 4. | Correct cards shown; combined filters may produce the empty state. Clear filters restores all items. |
| 3 | Add Chicken Alfredo twice. Open Cart. Change quantity, remove an item, then add it again. | Cart count and totals update. Explain shared state and callback props in App and Menu. |
| 4 | Choose Delivery and submit an empty form. Fill name, phone and address. Place two Chicken Alfredo portions. | Required fields block submission. Expected subtotal $37.98, GST $1.90, delivery $4.99, total $44.87. Confirmation appears; cart empties; order appears under My orders. |
| 5 | Place a separate Pickup order. | Address field disappears and delivery fee is $0.00. |
| 6 | Open Admin demo → Orders. Set an order to Preparing, then Ready and Delivered/Collected. Return to My orders. | Matching order status updates. Explain that updates are React state in the same tab, not a backend realtime service. |
| 7 | Create a future table reservation; create a birthday or corporate event with requirements at a different time/date. | Confirmation, pending status and event details appear. Past dates, empty fields and out-of-hours times are rejected. |
| 8 | Reserve 20 guests at 18:00 on a free future date. Try another booking at 18:30 that date. | Capacity message rejects the overlapping request. Cancel the first booking and retry; capacity becomes available. |
| 9 | Admin → Reservations: approve a pending event, then cancel one. Return to Reservations. | Customer sees the updated status and event details. Cancelled bookings cannot be reapproved; make a new booking. |
| 10 | Admin → Menu: add Test Soup, edit price and ingredients, toggle availability. | Customer menu reflects edits; unavailable item's add button is disabled. An unavailable/deleted item already in a cart prevents checkout until removed. |
| 11 | Delete Test Soup and confirm the prompt. | Item disappears. Existing order snapshots preserve names and prices when menu records change. |
| 12 | Ask all six suggested assistant questions. Ask an unknown question. | Replies reflect available items and actual previous orders, with a helpful fallback. Explain keyword matching and the PDF's permitted local simulation option. |
| 13 | Refresh the browser, then check orders, bookings and menu. | Data survives through localStorage. Explain useEffect and the storage-error message. |
| 14 | Narrow the browser to a phone-sized width and visit each page. | Navigation wraps; forms/cards stack; no sideways scrolling or clipped controls. |
| 15 | Show App.jsx, Menu.jsx, Cart.jsx, Reservations.jsx and assistant.js. | Explain routing, components, props, useState, useEffect, form events, map/keys, conditional fields and validation. |
| 16 | Show test output, production build and your GitHub history. | Explain what you actually verified, changes you made, any problems encountered and the remaining backend work. |

## GitHub progress

Use an existing course repository if you already have one; do not overwrite its history. Otherwise create a repository on GitHub and follow its instructions to connect this folder. A basic starting point is:

```bash
git init
git add .
git commit -m "Add restaurant frontend starting point"
```

Connect the actual repository URL supplied by GitHub and push. Never put passwords or tokens into files. Then make real, meaningful changes as you study and verify the project, committing each completed change with an accurate message. Use branches and merges for genuine improvements, such as fixing a validation issue or refining a component. Do not create empty commits or backdate history to imply earlier work. A single upload does not satisfy the instructor's progress criterion. For group work each member needs their own GitHub link and real contributions.

If you choose the Render hosting bonus, this is a static frontend: build with `npm ci && npm run build`, publish `dist`. Hosting is optional; backend hosting is outside Assignment 1.

## Submission checklist

- Completed project files (ZIP, without node_modules).
- Actual GitHub repository link, with genuine development progress.
- Camera-on video demonstrating features, relevant code, validation, debugging/testing and your understanding of development.
- Watch the video before submitting to confirm your camera, voice, screen and code are visible/readable.
- Upload to D2L and click Submit to finish. Check the receipt.
