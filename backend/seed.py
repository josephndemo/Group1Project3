from app import app
from models import db, User, Book

with app.app_context():
    print("⏳ Dropping and regenerating clean relational schema structures...")
    db.drop_all()
    db.create_all()

    print("👤 Seeding system administration profile rules...")
    admin = User(username="AdminManager", email="admin@bookshelf.com", role="admin")
    admin.set_password("AdminPass123!")
    
    regular_user = User(username="StandardReader", email="user@bookshelf.com", role="user")
    regular_user.set_password("UserPass123!")

    print("📚 Seeding base master library catalog records...")
    b1 = Book(
        title="The Pragmatic Programmer",
        author="Andrew Hunt & David Thomas",
        genre="Technology",
        description="A journey from journeyman to master systems analyst.",
        total_pages=352,
        publication_year=2019,
        cover_image="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60"
    )
    
    b2 = Book(
        title="Designing Data-Intensive Applications",
        author="Martin Kleppmann",
        genre="Technology",
        description="Deep dive into data architecture, processing streams, and storage clusters.",
        total_pages=611,
        publication_year=2017,
        cover_image="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60"
    )

    db.session.add_all([admin, regular_user, b1, b2])
    db.session.commit()
    print("🟢 Relational database instances successfully recreated and populated!")