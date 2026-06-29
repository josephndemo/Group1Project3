# OpenLibrary Hub

A modern, responsive full-stack Single Page Application (SPA) for discovering, organizing, and tracking books using the Open Library API paired with a secure relational backend data layer.

OpenLibrary Hub enables readers to search millions of books, manage personalized reading lists, save favorites, rate books, track reading progress percentages, and participate in live community book club discussions—all within a streamlined and intuitive user experience.

---

## Overview

OpenLibrary Hub was developed as a Software Engineering Capstone Project with a focus on:

* **Full-Stack Relational Architecture**: Robust Python Flask backend paired with a structured SQLite database.
* **Modern React Frontend**: Clean, highly reactive interface styled with Tailwind CSS v4.
* **Dynamic Bookshelf Metrics**: Real-time page accumulation trackers and automated completion percentage gauges.
* **Live Community Discussions**: Channelized book club discussion spaces mapped directly to explicit inventory entries.
* **State Management & Authentication**: Custom relational backref structures tracking unique individual data arrays.

The application integrates with the Open Library REST API to provide access to bibliographic records, while caching personal collection schemas on a dedicated local database storage subsystem.

---

## Deployed Application Link

https://openlibrary-one.vercel.app/

## Application Preview

> Add screenshots of your application here.

### Home Page
![Home Page](./src/assets/home-page.png)

### Bookshelf Tracker
![Bookshelf](./src/assets/bookshelf.png)

### Favorites
![Favorites](./src/assets/favorites.png)

### Reviews & Notes
![Reviews](./src/assets/reviews.png)

---

## Features

### 🔍 Real-Time Book Search
* Search books by title, author, or keyword using the Open Library API.
* Debounced search requests (600ms delay) to dramatically reduce redundant networking bandwidth overhead.
* Graceful loading states, network timeout handling, and fallback placeholder artwork rendering.

### 📚 Personal Bookshelf Progress Gauge
* Save books to a personal reading collection with structured states (`Want to Read`, `Reading`, `Completed`).
* Granular step metrics tracking exact current page values relative to the volume's total capacity.
* Automated UI progression animations updating calculated completion percentages instantly.

### 💬 Active Book Club Channels
* Dynamic live discussion spaces automatically indexed to specific book volumes.
* Sidebar channel views listing active discussions ordered explicitly by comment density metrics.
* Direct integration allowing users to click an item in their reading status list to instantly switch channels and broadcast context notes.

### 🛡️ Administrative Console
* Restricted structural dashboard for managing platform assets.
* Full CRUD control over the master catalog, including custom image URL injections, page definitions, and abstract summaries.
* Cascading deletion algorithms that clear orphan comment tracking blocks if an inventory record is purged.

---

## Technology Stack

| Layer | Component | Description |
| :--- | :--- | :--- |
| **Frontend** | React 19 | Declarative UI layer utilizing stateful hooks |
| **Styling & Assets** | Tailwind CSS v4 + Lucide | Utility-first compilation design with clean vector iconography |
| **Build Tool** | Vite | Rapid module replacement development server compilation |
| **Backend Framework** | Flask / Python 3 | Lightweight RESTful routing pipeline |
| **Database Engine** | SQLite | Relational file-based database architecture |
| **ORM Layer** | Flask-SQLAlchemy | Object-Relational Mapper capturing declarative schemas |
| **Serialization** | SQLAlchemy-Serializer | Handles dynamic nesting structure translation to clean JSON payloads |
| **Security Layer** | Werkzeug | High-fidelity PBKDF2 password hashing vectors |

---

## Project Structure

```text
capstone_library/
├── backend/
│   ├── instance/
│   │   └── bookshelf_hub.db      # SQLite relational database storage file
│   ├── app.py                   # Central server pipeline, API controllers, and route handling
│   ├── models.py                # Declarative SQLAlchemy models (User, Book, BookshelfItem, Comment)
│   ├── seed.py                  # Database flushing and multi-profile catalog generation script
│   └── requirements.txt         # Backend environment package specifications
└── frontend/
    ├── public/
    └── src/
        ├── assets/
        │   └── icon1.png        # Upsized custom platform logo asset
        ├── components/
        │   ├── Navbar.jsx
        │   └── Footer.jsx
        ├── features/
        │   └── books/
        │       ├── BookCard.jsx
        │       ├── BookGrid.jsx
        │       └── bookService.js
        ├── pages/
        │   ├── AdminPanel.jsx   # Administrative catalog management form
        │   ├── BookClub.jsx     # Live context streaming discussion panel
        │   ├── MyBookshelf.jsx  # Interactive reading progress workspace
        │   └── Home.jsx
        ├── App.jsx
        ├── index.css
        └── main.jsx
Relational Database Schema Design
The backend persistence layer utilizes an SQLite database structured around four highly normalized relational models with cascading dependencies:

User: Manages credentials, privilege roles, and holds one-to-many relationships out to bookshelf entries and reviews.

Book: Tracks global catalog data items (Title, Author, Pages, Cover Image Source URL).

BookshelfItem: A join table mapping a User to a Book with metadata attributes tracking progress metrics (current_page, status, completion_percentage).

Comment: A transactional record linking unique user notes to specific book channel frameworks.

Getting Started
Prerequisites
Node.js (v18 or later) & npm

Python (v3.8 or later)

pip (Python package installer)

1. Backend Workspace Initialization
Navigate to your backend directory, construct a virtual environment, install your dependencies, and initialize your database structure using the seed manager:

Bash
cd backend

# Initialize your Python isolation layer environment
python3 -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install requirements
pip install -r requirements.txt

# Execute database migration and load user/catalog seeds
python3 seed.py
2. Frontend Workspace Initialization
Open a secondary terminal window, navigate to the frontend directory, compile package assets, and spin up your local compilation development engine:

Bash
cd frontend

# Pull node packages
npm install

# Initialize development hot-module engine loop
npm run dev
3. Verification
Backend Engine Pipeline: Running on http://localhost:5555/

Frontend Component Dashboard: Running on http://localhost:5173/

Core Engineering Concepts
Declarative Relational Models (SQLAlchemy)
The SQLite backplane relies on strict structural models enforced at the schema engine layer:

Python
class BookshelfItem(db.Model, SerializerMixin):
    __tablename__ = 'bookshelf_items'
    serialize_rules = ('-user.bookshelf_items', '-book.bookshelf_instances')

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    status = db.Column(db.String(30), default='Want to Read')
    current_page = db.Column(db.Integer, default=0)
    completion_percentage = db.Column(db.Float, default=0.0)
Dynamic Progress Updates
Frontend components capture modifications via precise PATCH requests that target relational asset routes to update database models on the fly:

JavaScript
const payload = { current_page: pageNum };
if (pageNum > 0 && pageNum < totalPages && currentStatus === 'Want to Read') {
  payload.status = 'Reading';
}

const res = await fetch(`http://localhost:5555/api/bookshelf/${itemId}`, {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
  credentials: 'include'
});

Developer Team
Joseph Ndemo 

Mark Warunge

Gregory Kipchumba

Abdirahman Abdi Salah

Robert Maina

Rotich Ian
