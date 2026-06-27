import random
from app import app
from models import db, User, Book, BookshelfItem, Review, Note, Favorite

genres = ["Sci-Fi", "Fantasy", "Biography", "Technology", "Mystery", "History", "Self-Help", "Fiction"]
titles_pool = ["Digital Citadel", "Pythonic Dream", "Data Horizon", "Algorithm Grid", "Shadow Compile", "The Binary Empire", "Silicon Road", "Database Core", "Async Journey", "Relational Frontier"]
authors_pool = ["Grace Hopper", "Alan Turing", "Linus Torvalds", "Ada Lovelace", "Guido van Rossum", "Dennis Ritchie"]

def seed_database():
    print("🗑️ Purging stale database entries...")
    db.drop_all()
    print("🏗️ Creating clean database structural layouts...")
    db.create_all()

    print("👥 Seeding Roles (Admin & Standard User)...")
    admin = User(username="admin_joseph", email="admin@bookshelf.com", role="admin")
    admin.set_password("AdminPass123!")
    
    regular_user = User(username="reader_user", email="user@bookshelf.com", role="user")
    regular_user.set_password("UserPass123!")
    
    db.session.add_all([admin, regular_user])
    db.session.commit()

    print("📚 Synthesizing 100 comprehensive book catalog profiles...")
    books_list = []
    for i in range(1, 101):
        total_p = random.randint(180, 750)
        book_entry = Book(
            title=f"{random.choice(titles_pool)} (Vol. {random.randint(1,5)})" if i % 3 == 0 else f"The {random.choice(titles_pool)}",
            author=random.choice(authors_pool),
            genre=random.choice(genres),
            description="An in-depth study tracking data paradigms, architecture profiles, and advanced computer systems across the digital web footprint.",
            cover_image=f"https://picsum.photos/id/{random.randint(10, 800)}/400/600",
            publication_year=random.randint(1960, 2026),
            total_pages=total_p
        )
        books_list.append(book_entry)
        db.session.add(book_entry)
    
    db.session.commit()

    print("🌱 Generating baseline user shelf tracking histories...")
    # Add 15 books to the test user's bookshelf
    for j in range(15):
        target_book = books_list[j]
        status_choice = random.choice(["Want to Read", "Reading", "Completed"])
        curr_p = 0
        comp_pct = 0.0
        
        if status_choice == "Reading":
            curr_p = random.randint(10, 150)
            comp_pct = round((curr_p / target_book.total_pages) * 100, 1)
        elif status_choice == "Completed":
            curr_p = target_book.total_pages
            comp_pct = 100.0

        shelf_item = BookshelfItem(
            user_id=regular_user.id,
            book_id=target_book.id,
            status=status_choice,
            current_page=curr_p,
            completion_percentage=comp_pct
        )
        db.session.add(shelf_item)

        # Add a couple of reviews, notes and favorites to seed the analytics engine
        if j % 3 == 0:
            rev = Review(user_id=regular_user.id, book_id=target_book.id, rating=random.randint(4,5), review_text="Excellent read! Very concise definitions and architectures.")
            db.session.add(rev)
        if j % 4 == 0:
            note = Note(user_id=regular_user.id, book_id=target_book.id, note_text="Key takeaway: Ensure systems scale horizontally instead of vertically.", page_reference=random.randint(15, 80))
            db.session.add(note)
        if j % 5 == 0:
            fav = Favorite(user_id=regular_user.id, book_id=target_book.id)
            db.session.add(fav)

    db.session.commit()
    print("🚀 Seed sequencing complete! Local environment contains 100 catalog books, 1 admin, and 1 populated testing tracker.")

if __name__ == '__main__':
    with app.app_context():
        seed_database()