import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import BookCard from '../components/BookCard.jsx';
import { Search } from 'lucide-react';

export default function Home({ user, setCurrentView }) {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Explicitly querying API endpoints over matching absolute networks
    fetch('http://localhost:5555/api/books')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server tracking status returned structural code: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // Enforce array compliance mapping
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("Payload mismatch. Expected array array indices.", data);
          setBooks([]);
        }
      })
      .catch((err) => {
        console.error("Error accessing backend catalogs structural arrays:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddShelf = async (bookId) => {
    try {
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
          title: 'Added to your personal tracking shelf mapping!',
          showConfirmButton: false,
          timer: 1500,
          background: '#ffffff',
          iconColor: '#3b82f6'
        });
      } else {
        Swal.fire({
          title: 'Already Sitting on Shelf',
          text: 'This unique book is already logged within your configuration indexes.',
          icon: 'info',
          confirmButtonColor: '#3b82f6'
        });
      }
    } catch {
      Swal.fire('Network Interface Disruption', 'Unable to reach backend storage matrix arrays.', 'error');
    }
  };

  const filteredBooks = books.filter(b => 
    (b.title || '').toLowerCase().includes(query.toLowerCase()) || 
    (b.author || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="text-center py-8 max-w-xl mx-auto space-y-4">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Discover Master Catalogs</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto">Browse through centralized transaction indexes managed directly across core frameworks.</p>
        
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input 
            type="text" 
            value={query} 
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by book title name, author string criteria..." 
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-blue-500 shadow-sm font-medium transition-all focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {!user && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-2xl text-center max-w-md mx-auto shadow-sm space-y-3">
          <p className="text-xs font-bold text-blue-800">Log in to monitor custom pages, write note logs, and record metrics grids.</p>
          <button 
            onClick={() => setCurrentView('login')} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-4 py-2 rounded-xl shadow-sm transition-colors"
          >
            Authenticate Profile Access
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs font-bold animate-pulse">Syncing catalog dataset clusters...</div>
      ) : (
        <>
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {filteredBooks.map(book => (
                <BookCard key={book.id} book={book} onAddShelf={handleAddShelf} isAuthenticated={!!user} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs font-bold bg-white rounded-2xl border p-6 max-w-md mx-auto shadow-sm">
              No entries found inside inventory records. Log in as an administrator to populate books.
            </div>
          )}
        </>
      )}
    </div>
  );
}