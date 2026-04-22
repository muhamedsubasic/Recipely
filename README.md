"I analyzed WordPress in Labs 5–7 (category:  Content Management / Blogging Platform). I am building Recipe Blog with Categories, which belongs to the same category.

# Recipely — A Better WordPress‑Inspired Recipe Blog

# Live: https://recipely-l7h2.onrender.com/

A mini recipe blog that demonstrates three design patterns (Factory Method, Composite, Strategy) to address architectural weaknesses commonly found in CMSs like WordPress.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Run](#setup--run)
- [How to Use](#how-to-use)
- [Patterns Applied](#patterns-applied)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [What Makes This Better Than WordPress?](#what-makes-this-better-than-wordpress)

---

## Overview

`Recipely` is a compact recipe blog where users can browse recipes by category, view individual recipes with ingredients and instructions, and post comments. An admin panel (password: `admin123`) allows basic CRUD for recipes. The project intentionally applies design patterns to show how small architectural choices improve maintainability and extensibility.

---

## Features

- Recipes: Create, read, update, delete
- Categories: Breakfast, Lunch, Dessert
- Comments: Flat now, Composite ready for threaded replies
- Admin panel: Password-protected (`admin123`)
- Image support: Optional image URL per recipe
- Responsive grid layout and recipe cards
- Category filtering using Strategy pattern
- Username persistence via `localStorage`

---

## Tech Stack

- Backend: Node.js + Express
- Persistence: JSON files (`data/recipes.json`)
- Frontend: Plain HTML, CSS, Vanilla JS
- Patterns: Factory Method, Composite, Strategy

---

## Setup & Run

1. Install dependencies:

```bash
npm install express
```

2. Run the server:

```bash
node server.js
```

The app serves static files from `frontend/` and reads/writes JSON in `data/`.

---

## How to Use

- Browse recipes on the home page and filter by category.
- Click a recipe to view details and comments.
- Leave a comment (username is saved in `localStorage`).
- Admin: open `admin.html`, enter password `admin123` to add or edit recipes.

---

## Patterns Applied

- Creational — Factory Method: `backend/factories/PostFactory.js` centralizes post creation (e.g., `RecipePost`, `PagePost`).
- Structural — Composite: `backend/models/CommentComponent.js` models comments and threads with a uniform interface.
- Behavioral — Strategy: `backend/filters/FilterStrategy.js` and concrete filter classes encapsulate filtering logic.

---

## Project Structure

- `server.js` — Express server and routes
- `backend/factories/PostFactory.js` — Factory for post types
- `backend/models/RecipePost.js`, `backend/models/PagePost.js` — Post models
- `backend/models/CommentComponent.js` — Composite for comments
- `backend/filters/FilterStrategy.js` — Filter strategy implementations
- `frontend/` — `index.html`, `recipe.html`, `admin.html`, `style.css`
- `data/recipes.json` — Seeded recipes data

---

## API Endpoints

- GET `/api/recipes` — list recipes (supports category filters)
- GET `/api/recipes/:id` — single recipe
- POST `/api/recipes` — create (admin)
- PUT `/api/recipes/:id` — update (admin)
- DELETE `/api/recipes/:id` — delete (admin)
- POST `/api/recipes/:id/comments` — add comment

---

## What Makes This Better Than WordPress?

- Focused architecture: small, testable components instead of monolithic functions.
- Clear separation of concerns: factories, composites, and strategies make extension safer and cheaper.
- JSON-based persistence keeps the demo simple while the patterns remain applicable to real DBs.
