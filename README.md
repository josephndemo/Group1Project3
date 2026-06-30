# 📚 OpenLibrary Hub

![GitHub repo size](https://img.shields.io/badge/Full--Stack-Project-blue)
![Frontend](https://img.shields.io/badge/Frontend-React_19-61DBFB)
![Backend](https://img.shields.io/badge/Backend-Flask-000000)
![Database](https://img.shields.io/badge/Database-SQLite-003B57)
![Deployment](https://img.shields.io/badge/Deploy-Vercel_%26_Render-green)

---

## 🚀 Live Demo

- 🌐 **Frontend App:** https://openlibraryv31.vercel.app/
- ⚙️ **Backend API:** https://group1project3-2.onrender.com/
- 📦 **Source Code:** https://github.com/josephndemo/Group1Project3

---

## 📌 Overview

**OpenLibrary Hub** is a production-style full-stack web application that allows users to discover books, manage personal reading lists, track reading progress, and participate in book discussions.

Built as a **Software Engineering Capstone Project**, it demonstrates real-world engineering practices including:

- RESTful API design
- Relational database modeling
- Authentication & session management
- External API integration (Open Library)
- SPA architecture with React
- Cloud deployment (Vercel + Render)

---

## ✨ Key Features

### 🔍 Smart Book Search
- Real-time search using Open Library API
- Debounced requests to reduce API load
- Fallback UI for missing images/data

### 📚 Personal Bookshelf System
- Add books to personal library
- Track status: `Want to Read`, `Reading`, `Completed`
- Automatic progress calculation based on page tracking

### 📊 Reading Progress Engine
- Live progress percentage updates
- Page-by-page tracking system
- Auto-completion detection

### ❤️ Favorites System
- Save and manage favorite books
- Quick access dashboard

### 💬 Book Discussions
- Comment on books
- Threaded community discussions
- Book-specific conversation channels

### 🛡️ Admin Dashboard
- Create, update, delete books
- Manage global catalog
- Full CRUD control over system data

---

## 🧠 System Architecture


Frontend (React SPA)
↓
REST API (Flask)
↓
SQLite Database (SQLAlchemy ORM)
↓
Open Library API (External Data Source)


---

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS v4
- React Router
- Axios / Fetch API

### Backend
- Flask (Python)
- Flask-SQLAlchemy
- Flask-CORS
- Werkzeug Security

### Database
- SQLite (Relational DB)
- Normalized schema design

### Deployment
- Vercel (Frontend)
- Render (Backend API)

---

## 🗄️ Database Schema

### 👤 User
- id (PK)
- username
- email
- password_hash
- role

### 📖 Book
- id (PK)
- title
- author
- genre
- description
- cover_image
- total_pages

### 📚 BookshelfItem
- id (PK)
- user_id (FK)
- book_id (FK)
- status
- current_page
- completion_percentage

### 💬 Comment
- id (PK)
- user_id (FK)
- book_id (FK)
- text
- created_at

---

## ⚡ API Reference

### Base URL

https://group1project3-2.onrender.com


---

### 🔐 Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/signup | Register user |
| POST | /api/login | Login user |
| POST | /api/logout | Logout user |
| GET | /api/me | Get current session user |

---

### 📚 Books

| Method | Endpoint |
|--------|----------|
| GET | /api/books |
| POST | /api/books |
| PATCH | /api/books/:id |
| DELETE | /api/books/:id |

---

### 📖 Bookshelf

| Method | Endpoint |
|--------|----------|
| GET | /api/bookshelf |
| POST | /api/bookshelf |
| PATCH | /api/bookshelf/:id |
| DELETE | /api/bookshelf/:id |

---

### 💬 Comments

| Method | Endpoint |
|--------|----------|
| GET | /api/comments |
| POST | /api/comments |
| PATCH | /api/comments/:id |
| DELETE | /api/comments/:id |

---

## ⚙️ Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/josephndemo/Group1Project3.git
cd Group1Project3
2️⃣ Backend Setup
cd backend

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt
python3 seed.py
python3 app.py

Backend runs at:

http://localhost:5555
3️⃣ Frontend Setup
cd frontend

npm install
npm run dev

Frontend runs at:

http://localhost:5173
🌍 Deployment
Layer	Platform	URL
Frontend	Vercel	https://openlibraryv31.vercel.app/
Backend	Render	https://group1project3-2.onrender.com/

🔮 Future Enhancements
AI-powered book recommendations
Dark mode UI
Real-time chat (WebSockets)
Advanced search filtering
User profiles & social features
Email notifications
Mobile app (React Native)

👨‍💻 Contributors
Joseph Ndemo
Mark Warunge
Gregory Kipchumba
Abdirahman Abdi Salah
Robert Maina
Rotich Ian
