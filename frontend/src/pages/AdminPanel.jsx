import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { PlusCircle } from 'lucide-react';

export default function AdminPanel() {
  const [form, setForm] = useState({ title: '', author: '', genre: 'Sci-Fi', total_pages: 250, publication_year: 2026, description: '' });

  const handleCreateBook = async (e) => {
    e.preventDefault();
    const coverRandomId = Math.floor(Math.random() * 700) + 50;
    const bookPayload = {
      ...form,
      cover_image: `https://picsum.photos/id/${coverRandomId}/400/600`
    };

    const res = await fetch('http://localhost:5555/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookPayload),
      credentials: 'include'
    });

    if (res.ok) {
      Swal.fire({
        title: 'Book Created!',
        text: `"${form.title}" committed directly to master inventory records.`,
        icon: 'success',
        confirmButtonColor: '#3b82f6'
      });
      setForm({ title: '', author: '', genre: 'Sci-Fi', total_pages: 250, publication_year: 2026, description: '' });
    } else {
      Swal.fire({
        title: 'Access Denied',
        text: 'Administrator role verification failed.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <PlusCircle className="text-blue-600 w-5 h-5" /> Master Inventory Manager
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">Append fresh catalog entries directly into the central database network arrays.</p>
      </div>

      <form onSubmit={handleCreateBook} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-600">
        <div className="sm:col-span-2">
          <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Book Title Name</label>
          <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold" required />
        </div>
        <div>
          <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Author Name</label>
          <input type="text" value={form.author} onChange={e => setForm({...form, author: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold" required />
        </div>
        <div>
          <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Genre Classification</label>
          <select value={form.genre} onChange={e => setForm({...form, genre: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold bg-white">
            {["Sci-Fi", "Fantasy", "Biography", "Technology", "Mystery", "History", "Self-Help", "Fiction"].map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Total Page Count</label>
          <input type="number" value={form.total_pages} onChange={e => setForm({...form, total_pages: parseInt(e.target.value) || 0})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold" required />
        </div>
        <div>
          <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Publication Year</label>
          <input type="number" value={form.publication_year} onChange={e => setForm({...form, publication_year: parseInt(e.target.value) || 0})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold" required />
        </div>
        <div className="sm:col-span-2">
          <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Brief Summary Description</label>
          <textarea rows="3" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 font-semibold" placeholder="Describe abstract text summary..."></textarea>
        </div>
        <button type="submit" className="sm:col-span-2 bg-slate-900 hover:bg-black text-white font-bold text-xs py-3 rounded-xl shadow-sm mt-2 transition-colors tracking-wide">
          Commit Book Entry
        </button>
      </form>
    </div>
  );
}