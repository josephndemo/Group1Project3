# 📚 OpenLibrary Hub

![React](https://img.shields.io/badge/Frontend-React_19-61DBFB)
![Flask](https://img.shields.io/badge/Backend-Flask-black)
![Database](https://img.shields.io/badge/Database-SQLite-003B57)
![Deploy](https://img.shields.io/badge/Deploy-Vercel%20%7C%20Render-green)

---

## 🚀 Live Demo

- 🌐 Frontend: https://openlibraryv31.vercel.app/
- ⚙️ Backend API: https://group1project3-2.onrender.com/
- 📦 GitHub Repo: https://github.com/josephndemo/Group1Project3

---

## 📁 Project Structure

```text
Group1Project3/
├── backend/
│   ├── app.py                # Flask application entry point
│   ├── models.py            # SQLAlchemy database models
│   ├── seed.py              # Database seeding script
│   ├── requirements.txt     # Python dependencies
│   └── instance/
│       └── bookshelf_hub.db # SQLite database file
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── assets/          # Images & icons
│   │   ├── components/      # Reusable UI components
│   │   ├── features/        # Feature modules (books, auth, etc.)
│   │   ├── pages/           # Page views
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles (Tailwind)
│   ├── index.html           # Root HTML file
│   └── package.json         # Frontend dependencies
│
└── README.md



📌 Overview

OpenLibrary Hub is a full-stack reading platform that allows users to:

Search books using Open Library API
Save books to personal shelves
Track reading progress
Write reviews and comments
Manage favorites
Participate in book discussions
Administer book catalog (admin users)

✨ Features
🔍 Book Search
Live search using Open Library API
Debounced requests for performance
Fallback UI for missing data
📚 Bookshelf System
Want to Read / Reading / Completed states
Progress tracking per book
Automatic completion calculation
❤️ Favorites
Save and manage favorite books
⭐ Reading Progress
Page-based progress tracking
Auto status updates when completed
💬 Book Discussions
Comment system per book
User-generated discussions
🛡️ Admin Dashboard
Add, update, delete books
Manage catalog content

🛠️ Tech Stack
Frontend
React 19
Vite
Tailwind CSS
React Router
Backend
Flask (Python)
Flask-SQLAlchemy
Flask-CORS
Werkzeug Security
Database
SQLite (Relational DB)
Deployment
Vercel (Frontend)
Render (Backend)

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
2. Backend Setup
cd backend

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
python3 seed.py
python3 app.py

Backend runs at:
http://localhost:5555

3. Frontend Setup
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

👥 Contributors
Joseph Ndemo
Mark Warunge
Gregory Kipchumba
Abdirahman Abdi Salah
Robert Maina
Rotich Ian