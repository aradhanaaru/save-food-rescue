[README (2).md](https://github.com/user-attachments/files/30222578/README.2.md)
# SAVE — Smart Allocation for Valuable Edibles

Built for **HackFusion 2026** (StartupTN, VET Institute of Arts and Science).

Surplus food from events, weddings, and canteens across Tamil Nadu often goes to waste simply because there's no fast, organized way to connect the people who have it with the NGOs who need it. SAVE is a lightweight web platform that closes that gap: donors post what they have, nearby NGOs claim what they need, and the whole handoff is tracked from listing to pickup.

## Why this design

The core idea we kept coming back to: food rescue is fundamentally a **logistics problem**, not just a listing problem. So instead of building a generic classifieds board, every part of the UI is built around the actual journey a donation takes — `Listed → Claimed → Picked up` — visualized as a dotted route line on every card and on the landing page. The color palette (marigold, banana-leaf green, clay terracotta for urgency) is drawn from Tamil Nadu food-donation culture rather than a generic tech palette.

## Features

- **Live food listings** — donors post surplus food (type, quantity, pickup location, time window); NGOs see updates in real time, no refresh needed
- **Partial claiming** — a large donation can be split across multiple NGOs instead of one-claim-takes-all
- **Vehicle recommendation** — estimates the load weight from serving count and suggests an appropriate pickup vehicle (auto / tempo / mini-truck), based on typical Tamil Nadu food transport patterns
- **Map view** — donor pickup locations plotted on an interactive map, scoped to Tamil Nadu
- **Impact dashboard** — live totals: servings rescued, completed rescues, breakdown by food type
- **Status tracking** — every listing visibly moves through Listed → Claimed → Picked up

## Tech stack

- **Frontend:** React + Vite, Tailwind CSS v4, React Router
- **Backend:** Firebase Firestore (real-time database, no custom server needed)
- **Maps & geocoding:** Leaflet + OpenStreetMap (free, no API key), Nominatim for geocoding pickup locations, biased to Tamil Nadu

## Known limitations (honest scope for a hackathon build)

- No authentication yet — anyone can currently post or claim a listing. Fine for a demo, not production-ready.
- Geocoding depends on how specific the entered location text is (e.g. "Gandhipuram, Coimbatore" resolves reliably; a vague name may not).
- No live transporter-matching between donor and NGO — pickup is currently self-arranged by the claiming NGO.
- Built and tested locally; not yet load-tested for concurrent multi-user use at scale.

## Running locally

```bash
npm install
npm run dev
```

You'll need your own Firebase project (Firestore enabled, test-mode rules for local development) and to add your config to `src/firebase.js`.

## Team

Built by [THE CORE FOUR] for HackFusion 2026,  at VET Institute of Arts and Science.
