import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { PlusCircle, Pencil, Trash2, XCircle, Check, Database } from 'lucide-react';

export default function AdminPanel() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', genre: 'Sci-Fi', total_pages: 250, publication_year: 2026, description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', author: '', genre: '', total_pages: 0, publication_year: 0, description: '' });

  const fetchInventory = () => {
    fetch('http://localhost:5555/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => console.error("Could not fetch inventory database grid."));
  };

  useEffect(() => { fetchInventory(); }, []);

  // CREATE WORKFLOW
  const handleCreateBook = async (e) => {
    e.preventDefault();
    const coverRandomId = Math.floor(Math.random() * 700) + 50;
    const payload = { ...form, cover_image: `https://picsum.photos/id/${coverRandomId}/400/600` };

    const res = await fetch('http://localhost:5555/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: 'include'
    });

    if (res.ok) {
      Swal.fire({ title: 'Book Added!', text: `"${form.title}" registered successfully.`, icon: 'success', confirmButtonColor: '#3b82f6' });
      setForm({ title: '', author: '', genre: 'Sci-Fi', total_pages: 250, publication_year: 2026, description: '' });
      fetchInventory();
    } else {
      Swal.fire('Error', 'Failed to add entry item. Ensure admin status.', 'error');
    }
  };

  // INITIALIZE INLINE UPDATE MODE
  const startEdit = (book) => {
    setEditingId(book.id);
    setEditForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      total_pages: book.total_pages,
      publication_year: book.publication_year,
      description: book.description || ''
    });
  };

  // SUBMIT UPDATE WORKFLOW
  const handleSaveUpdate = async (bookId) => {
    const res = await fetch(`http://localhost:5555/api/books/${bookId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
      credentials: 'include'
    });

    if (res.ok) {
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Changes saved cleanly!', showConfirmButton: false, timer: 1500 });
      setEditingId(null);
      fetchInventory();
    } else {
      Swal.fire('Error', 'Could not apply update metrics.', 'error');
    }
  };

  // DELETE WORKFLOW
  const handleDeleteBook = (bookId, title) => {
    Swal.fire({
      title: 'Delete Book Structural Profile?',
      text: `Are you sure you want to completely erase "${title}"? This drops cascading user tracking assets!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, purge record',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`http://localhost:5555/api/books/${bookId}`, { method: 'DELETE', credentials: 'include' });
        if (res.ok) {
          Swal.fire('Purged!', 'Book erased from database index maps.', 'success');
          fetchInventory();
        } else {
          Swal.fire('Error', 'Failed to execute transactional deletion.', 'error');
        }
      }
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* COLUMN 1: FORM CONTROLLER PROFILE */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm h-fit space-y-6">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <PlusCircle className="text-blue-600 w-5 h-5" /> Add Master Profile
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Append fresh parameters to the inventory storage index array.</p>
        </div>

        <form onSubmit={handleCreateBook} className="space-y-4 text-xs font-medium text-slate-600">
          <div>
            <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Book Title Name</label>
            <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold" required />
          </div>
          <div>
            <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Author Name</label>
            <input type="text" value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold" required />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Genre</label>
              <select value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold bg-white">
                {["Sci-Fi", "Fantasy", "Biography", "Technology", "Mystery", "History", "Self-Help", "Fiction"].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Total Pages</label>
              <input type="number" value={form.total_pages} onChange={e => setForm({...form, total_pages: parseInt(e.target.value) || 0})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold" required />
            </div>
          </div>
          <div>
            <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Publication Year</label>
            <input type="number" value={form.publication_year} onChange={e => setForm({...form, publication_year: parseInt(e.target.value) || 0})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold" required />
          </div>
          <div>
            <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Brief Description Summary</label>
            <textarea rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold" placeholder="Describe layout details..."></textarea>
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-colors tracking-wide">
            Commit New Book Record
          </button>
        </form>
      </div>

      {/* COLUMN 2 & 3: INVENTORY GRID DASHBOARD LIST */}
      <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Database className="text-slate-700 w-5 h-5" /> Database Inventory Index
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Manage live asset records across relational storage clusters.</p>
          </div>
          <span className="text-xs font-bold bg-slate-100 px-3 py-1 text-slate-600 rounded-full">{books.length} Total Titles</span>
        </div>

        <div className="space-y-3 overflow-y-auto max-h-[600px] pr-1">
          {books.map(book => (
            <div key={book.id} className="border border-slate-100 rounded-xl p-4 flex gap-4 bg-slate-50 items-center justify-between shadow-sm">
              
              {editingId === book.id ? (
                /* INLINE EDIT MODE RENDER */
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                  <div className="sm:col-span-2"><input type="text" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg text-xs" placeholder="Title" /></div>
                  <div><input type="text" value={editForm.author} onChange={e => setEditForm({...editForm, author: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg text-xs" placeholder="Author" /></div>
                  <div>
                    <select value={editForm.genre} onChange={e => setEditForm({...editForm, genre: e.target.value})} className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white">
                      {["Sci-Fi", "Fantasy", "Biography", "Technology", "Mystery", "History", "Self-Help", "Fiction"].map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                  <div><input type="number" value={editForm.total_pages} onChange={e => setEditForm({...editForm, total_pages: parseInt(e.target.value) || 0})} className="w-full p-2 border border-slate-300 rounded-lg text-xs" placeholder="Pages" /></div>
                  <div><input type="number" value={editForm.publication_year} onChange={e => setEditForm({...editForm, publication_year: parseInt(e.target.value) || 0})} className="w-full p-2 border border-slate-300 rounded-lg text-xs" placeholder="Year" /></div>
                  
                  <div className="sm:col-span-2 flex justify-end gap-1 pt-1">
                    <button onClick={() => handleSaveUpdate(book.id)} className="bg-emerald-600 text-white p-2 rounded-lg font-bold flex items-center gap-1 text-[11px]"><Check className="w-3.5 h-3.5" /> Save</button>
                    <button onClick={() => setEditingId(null)} className="bg-slate-500 text-white p-2 rounded-lg font-bold flex items-center gap-1 text-[11px]"><XCircle className="w-3.5 h-3.5" /> Cancel</button>
                  </div>
                </div>
              ) : (
                /* STANDARD READ-ONLY INVENTORY ITEM DISPLAY */
                <>
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={book.cover_image} alt={book.title} className="w-12 h-16 object-cover rounded-lg bg-slate-200 border shadow-sm" />
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-slate-800 text-sm truncate">{book.title}</h4>
                      <p className="text-xs text-slate-400 font-semibold">by {book.author} • <span className="text-blue-600">{book.genre}</span></p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{book.total_pages} Pages ({book.publication_year})</p>
                    </div>
                  </div>

                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => startEdit(book)} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-transparent hover:border-blue-100 rounded-xl transition-all">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDeleteBook(book.id, book.title)} className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-xl transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
              
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}