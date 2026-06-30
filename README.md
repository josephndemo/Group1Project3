# 📚 OpenLibrary Hub

A modern, responsive full-stack Single Page Application (SPA) for discovering, organizing, and tracking books using the Open Library API with a Flask backend and SQLite database.

---

## 🚀 Live Links

- 🌐 Frontend: https://openlibraryv31.vercel.app/
- ⚙️ Backend API: https://group1project3-2.onrender.com/
- 📦 GitHub Repo: https://github.com/josephndemo/Group1Project3

---

## 📸 Application Preview

### 💻 Home Page
![Home Page](https://openlibraryv31.vercel.app/src/assets/preview-home.png)

### 📚 Bookshelf
![Bookshelf](https://openlibraryv31.vercel.app/src/assets/preview-shelf.png)

### ❤️ Favorites
![Favorites](https://openlibraryv31.vercel.app/src/assets/preview-favs.png)

### 💬 Reviews
![Reviews](https://openlibraryv31.vercel.app/src/assets/preview-reviews.png)

---

## 📋 Overview

OpenLibrary Hub is a **Software Engineering Capstone Project** demonstrating full-stack system design using modern web technologies.

It combines:
- React frontend SPA
- Flask REST API backend
- SQLite relational database
- Open Library external API integration

### Key Capabilities
- Dynamic book search across millions of titles
- Personal bookshelf tracking system
- Reading progress monitoring
- Community book discussions
- Admin dashboard for catalog management
- Secure authentication system

---

## ✨ Features

### 🔍 Book Search
- Search by title, author, or keyword
- Debounced API requests
- Loading states and fallback images

### 📚 Bookshelf
- Want to Read / Reading / Completed states
- Page tracking system
- Auto completion calculation

### ❤️ Favorites
- Save and revisit favorite books

### ⭐ Reading Progress
- Real-time percentage updates
- Auto status updates when completed

### 💬 Book Club
- Book-based discussion threads
- User comments and reviews

### 🛡️ Admin Dashboard
- Create, update, delete books
- Manage catalog content

---

## 🛠️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | React 19 |
| Styling | Tailwind CSS v4 |
| Backend | Flask (Python) |
| Database | SQLite |
| ORM | SQLAlchemy |
| API | REST + Open Library API |
| Auth | Werkzeug Security |
| Deployment | Vercel + Render |

---

## 📁 Project Structure

```text
Group1Project3/
├── backend/
│   ├── app.py
│   ├── models.py
│   ├── seed.py
│   ├── requirements.txt
│   └── instance/
│       └── bookshelf_hub.db
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│
└── README.md

🗄️ Database Schema
User
id (PK)
username
email
password_hash
role
Book
id (PK)
title
author
genre
description
cover_image
total_pages
BookshelfItem
id (PK)
user_id (FK)
book_id (FK)
status
current_page
completion_percentage
Comment
id (PK)
user_id (FK)
book_id (FK)
text
created_at
⚡ REST API
Base URL
https://group1project3-2.onrender.com
🔐 Authentication
Method	Endpoint	Description
POST	/api/signup	Register user
POST	/api/login	Login user
POST	/api/logout	Logout user
GET	/api/me	Get current user
📚 Books
Method	Endpoint
GET	/api/books
POST	/api/books
PATCH	/api/books/:id
DELETE	/api/books/:id
📖 Bookshelf
Method	Endpoint
GET	/api/bookshelf
POST	/api/bookshelf
PATCH	/api/bookshelf/:id
DELETE	/api/bookshelf/:id
💬 Comments
Method	Endpoint
GET	/api/comments
POST	/api/comments
PATCH	/api/comments/:id
DELETE	/api/comments/:id
⚙️ Installation
1. Clone Repository
git clone https://github.com/josephndemo/Group1Project3.git
cd Group1Project3
🧠 Backend Setup
cd backend
python3 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python3 seed.py
python3 app.py

Backend runs at:

http://localhost:5555
🌐 Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🌍 Deployment
Service	URL
Frontend	https://openlibraryv31.vercel.app/
Backend	https://group1project3-2.onrender.com/
🔮 Future Improvements
AI book recommendations
Dark mode UI
Real-time chat (WebSockets)
User profiles
Email notifications
Advanced search filters
👥 Team
Joseph Ndemo
Mark Warunge
Gregory Kipchumba
Abdirahman Abdi Salah
Robert Maina
Rotich Ian
