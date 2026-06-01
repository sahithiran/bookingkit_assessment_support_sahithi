# Solutions Engineer Assessment - Adventure Berlin

A mock tour-booking website for Berlin activities. The bookingkit widget integration is missing - your job is to build it.

## Project Setup

```bash
npm install
npm run dev
```

---

## Context

Adventure Berlin is a fictional activity operator using bookingkit to handle reservations. The site was built by a developer who left mid-project. The widget was never integrated - only a placeholder container exists in `src/App.tsx`. Your job is to integrate it correctly, then extend and improve the implementation.

Widget container is in `src/App.tsx` - look for `bookingKitContainer`.

---

## bookingkit Widget Embed Code

The client provided this standard embed snippet from their bookingkit dashboard:

```html
<div id="bookingKitContainer" data-cw="a3eaf40ba1e10a325057e1c093a33348"></div>
<script src="https://e4f3731ff5f897d8041de92c673fc021.widget-sandbox.bookingkit.net/bkscript/a3eaf40ba1e10a325057e1c093a33348/" async></script>
```

This works on a plain HTML page. Your task is to make it work in this React app.

---

## Documentation

bookingkit developer docs: https://developers.bookingkit.com/

---

## Assessment Tasks

### Task 1 - Write a merchant-facing diagnosis email (required)

**Scenario:** You receive this email from a client:

> "Hi, our web agency launched a new version of our website yesterday and now the booking widget has disappeared. We didn't change anything in bookingkit. Can you help?"

**Your task:**
Write the reply you would send. The client is non-technical. Your email should:
- Acknowledge the issue
- Ask the right diagnostic questions (without jargon)
- Explain likely causes in plain language
- Set a realistic expectation for resolution time

---

### Task 2 - Integrate the widget (required)

**Scenario:** The client sent you the embed code above and expects the booking widget to appear on their site. The placeholder `div#bookingKitContainer` already exists in the React app. The `<script>` tag has not been added yet.

**Your task:**
1. Integrate the embed code so the widget renders correctly.
2. Explain in 2–3 sentences why you cannot simply paste the `<script>` tag into JSX and what you did instead.

**Hints:** Use browser DevTools to verify the widget loads. No hints on implementation approach.

---

### Task 3 - Connect tour selection to the widget (required)

**Scenario:** Clicking "Quick Book" on a tour card opens a custom payment modal that has no connection to the bookingkit widget. This is a dead end for real bookings.

**Your task:**
1. Remove the dummy tour selection modal and its fake 2-step payment form.
2. When a user clicks "Quick Book" or a tour card, scroll to the bookingkit widget section instead.

---

### Task 4 - Add loading and error states (optional)

**Scenario:** The widget takes 1–2 seconds to load over a real network. Users currently see nothing - no skeleton, no fallback.

**Your task:**
1. Show a loading indicator while the widget script is loading.
2. Show a user-friendly error message if the script fails to load (simulate with a bad URL to test).
3. The placeholder UI should disappear once the widget is ready.

---

### Task 5 - Real-time availability urgency signals (stretch)

**Scenario:** The client wants to drive conversions by showing real-time urgency on the tour cards - for example: *"Selling fast - only 3 spots left this week"* or *"Nearly full"* badges. The data should come live from the bookingkit API, not be hardcoded.

**Setup:** Use the credentials shared with you earlier. Copy `.env.local.example` to `.env.local`, fill in those values, and restart the dev server.

```bash
cp .env.local.example .env.local
# add credentials, then:
npm run dev
```

**API flow:**

Authenticate:
```
POST /oauth/token
grant_type=client_credentials&client_id=...&client_secret=...
→ { access_token, expires_in: 3600 }
```

Discover the event in the sandbox account:
```
GET /events
Authorization: Bearer <access_token>
→ events[]: { id, title, ... }
```

Fetch availability for the next 10 days:
```
GET /dates?available_from=<today>&end_date=<today+10days>
Authorization: Bearer <access_token>
→ dates[]: { event_id, capacity, booked, available_slots, start }
```

The sandbox contains one active event. The same event ID is also embedded in the booking widget already on the page - feel free to inspect it as a reference.

**Your task:**

1. Fetch the event and its availability for the next 10 days on page load.
2. Match the API event to the relevant tour card and calculate occupancy:
   - `total_booked / total_capacity`
3. Display a contextual badge on the matched tour card based on these thresholds:

| Occupancy | Badge |
|---|---|
| ≥ 80% | `Almost full` (red) |
| ≥ 50% | `Selling fast` (amber) |
| < 50% | No badge |

4. If a tour has fewer than 5 total `available_slots` across the next 10 days, override any badge with: *"Only N spots left"*

**Constraints:**
- Cache the OAuth token for its full 1-hour lifetime - do not fetch a new token on every render.
- Do not block page render on the API call - show badges when data arrives.
- No hardcoded occupancy values.

**Bonus:** If an event has zero available dates in the next 10 days, dim the card and show *"Sold out"*.

> **API returning 401, 403, or no data?** First check that `.env.local` is present and the dev server was restarted after adding it. If credentials are confirmed correct and the sandbox API still fails, this may be an infrastructure issue on our side. Document what you tried (request, response, what you expected), and reach out to Bookingkit again.

---

## Time

Recommended: 90 minutes total.

- Task 1: ~20 minutes (communication)
- Tasks 2–3: ~40 minutes (technical)
- Tasks 4 & 5: optional, use remaining time

There is no expectation to finish all stretch tasks. Depth over breadth.
