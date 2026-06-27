import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import BookCard from '../components/BookCard.jsx';
import { Search } from 'lucide-react';

export default function Home({ user, setCurrentView }) {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5555/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch(() => console.error("Error accessing backend catalogs."))
      .finally(() => setLoading(false));
  }, []);

  const handleAddShelf = async (bookId) => {
    const res = await fetch('http://localhost:5555/api/bookshelf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ book_id: bookId, status: 'Want to Read' }),
      credentials: 'include'
    });

    if (res.ok) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Added to your bookshelf!',
        showConfirmButton: false,
        timer: 1500,
        background: '#ffffff',
        iconColor: '#3b82f6'
      });
    } else {
      Swal.fire({
        title: 'Already Tracked',
        text: 'This book is already sitting safely on your active shelf mapping.',
        icon: 'info',
        confirmButtonColor: '#3b82f6'
      });
    }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(query.toLowerCase()) || 
    b.author.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="text-center py-8 max-w-xl mx-auto space-y-4">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Discover Master Catalogs</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">Browse through the centralized application core workspace framework entries instantly.</p>
        
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            value={query} 
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by title, author name..." 
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-blue-500 shadow-sm font-medium transition-all focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {!user && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-2xl text-center max-w-md mx-auto shadow-sm space-y-3">
          <p className="text-xs font-bold text-blue-800">Want to track progress, complete collections, and write notes?</p>
          <button 
            onClick={() => setCurrentView('login')} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-4 py-2 rounded-xl shadow-sm transition-colors"
          >
            Sign In to Start Tracking
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs font-bold">Querying library index...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} onAddShelf={handleAddShelf} isAuthenticated={!!user} />
          ))}
        </div>
      )}
    </div>
  );
}