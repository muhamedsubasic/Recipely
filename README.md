"I analyzed WordPress in Labs 5–7 (category:  Content Management / Blogging Platform). I am building Recipe Blog with Categories, which belongs to the same category.

# Live: https://recipely-l7h2.onrender.com/

# 🍽️ Recipe Blog – A Better WordPress‑Inspired CMS

> A mini recipe blog that demonstrates **three design patterns** (Factory Method, Composite, Strategy) to fix architectural weaknesses found in real CMSs like WordPress.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Run](#setup--run)
- [How to Use](#how-to-use)
- [Patterns Applied](#patterns-applied)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [What Makes This Better Than WordPress?](#what-makes-this-better-than-wordpress)

---

## Overview

This project is a **recipe blog** where users can:
- Browse recipes filtered by category (breakfast, lunch, dessert)
- View a single recipe with its ingredients and instructions
- Leave comments (with a clean UI, username persistence, and Enter‑to‑submit)
- Administrators can create, edit, and delete recipes via a password‑protected panel

The code intentionally applies **design patterns** that are **missing or poorly implemented** in real CMSs (e.g., WordPress) to show how small architectural choices improve maintainability, testability, and extensibility.

---

## Features

✅ **Recipes** – Create, read, update, delete  
✅ **Categories** – Breakfast, lunch, dessert  
✅ **Comments** – Flat for now (Composite pattern ready for threading)  
✅ **Admin panel** – Password‑protected form (`admin123`)  
✅ **Image support** – Optional image URL per recipe  
✅ **Responsive grid layout** – Recipes display as cards with images  
✅ **Filter by category** – Strategy pattern in action  
✅ **Username persistence** – Saves commenter’s name in `localStorage`  
✅ **Enter key submission** – Press Enter to post a comment  

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Backend     | Node.js + Express                   |
| Persistence | JSON files (`data/recipes.json`, `data/comments.json`) |
| Frontend    | Plain HTML, CSS, Vanilla JS         |
| Styling     | Custom CSS (grid, cards, shadows)   |
| Patterns    | Factory Method, Composite, Strategy |

> No database setup required – just run the server.

---

## Setup & Run

1. **Clone or download** the project into a folder.
2. **Install dependencies** (only Express):
   ```bash
   npm install express
   ```
