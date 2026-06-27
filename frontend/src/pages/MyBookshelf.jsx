import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Trash2, RefreshCw, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function MyBookshelf() {
  const [items, setItems] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('recently_added');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchShelf = () => {
    let url = `http://localhost:5555/api/bookshelf?page=${page}&sort=${sortBy}`;
    if (statusFilter) url += `&status=${statusFilter}`;

    fetch(url, { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        setItems(data.data || []);
        setTotalPages(Math.ceil(data.total / data.per_page) || 1);
      });
  };

  useEffect(() => { fetchShelf(); }, [statusFilter, sortBy, page]);

  const handleUpdateProgress = (itemId, maxPages) => {
    Swal.fire({
      title: 'Update Current Page',
      input: 'number',
      inputLabel: `Enter page index (Max: ${maxPages})`,
      inputPlaceholder: 'e.g., 45',
      showCancelButton: true,
      confirmButtonText: 'Save Progress',
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#64748b'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const pageNum = parseInt(result.value);
        if (isNaN(pageNum) || pageNum < 0 || pageNum > maxPages) {
          Swal.fire('Invalid Page', `Please provide an integer between 0 and ${maxPages}.`, 'error');
          return;
        }

        const resp = await fetch(`http://localhost:5555/api/bookshelf/${itemId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ current_page: pageNum }),
          credentials: 'include'
        });

        if (resp.ok) {
          Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Progress committed!', showConfirmButton: false, timer: 1500 });
          fetchShelf();
        } else {
          Swal.fire('Error', 'Failed to update track records.', 'error');
        }
      }
    });
  };

  const handleDeleteItem = (itemId) => {
    Swal.fire({
      title: 'Remove Book?',
      text: "This drops the book entirely from your personal shelf tracking layout.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:5555/api/bookshelf/${itemId}`, { method: 'DELETE', credentials: 'include' });
        setItems(prev => prev.filter(i => i.id !== itemId));
        Swal.fire('Deleted', 'Book dropped cleanly.', 'success');
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-800">Tracked Shelf Framework</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage your real-time reading progress structures.</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <SlidersHorizontal className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              value={statusFilter} 
              onChange={e => { setStatusFilter(e.target.value); setPage(1); }} 
              className="pl-9 pr-4 py-2 border border-slate-200 text-xs rounded-xl font-bold bg-slate-50 focus:outline-none focus:border-blue-500 w-full"
            >
              <option value="">All Tracking Statuses</option>
              <option value="Want to Read">Want to Read</option>
              <option value="Reading">Reading</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="relative flex-grow sm:flex-grow-0">
            <ArrowUpDown className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              value={sortBy} 
              onChange={e => setSortBy(e.target.value)} 
              className="pl-9 pr-4 py-2 border border-slate-200 text-xs rounded-xl font-bold bg-slate-50 focus:outline-none focus:border-blue-500 w-full"
            >
              <option value="recently_added">Recently Added</option>
              <option value="title">Book Title Name</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 shadow-sm items-center hover:shadow-md transition-shadow duration-200">
              <img src={item.book.cover_image} alt={item.book.title} className="w-20 h-28 object-cover rounded-xl bg-slate-50 border border-slate-100 shadow-sm" />
              <div className="flex-grow space-y-2 min-w-0">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm truncate">{item.book.title}</h4>
                  <p className="text-xs text-slate-400 font-medium">by {item.book.author}</p>
                </div>
                
                <div className="pt-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                    <span>Progress: {item.current_page} / {item.book.total_pages} pages</span>
                    <span className="text-blue-600">{item.completion_percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${item.completion_percentage}%` }}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className={`text-[10px] px-2 py-0.5 font-bold rounded-md ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                    {item.status}
                  </span>
                  <div className="flex gap-1">
                    <button onClick={() => handleUpdateProgress(item.id, item.book.total_pages)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><RefreshCw className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDeleteItem(item.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-slate-100 text-xs text-slate-400 font-semibold shadow-sm">
            No tracked assets matched your filter configuration.
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-2 pt-4">
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 bg-white border border-slate-200 text-xs rounded-xl disabled:opacity-50 font-bold shadow-sm hover:bg-slate-50 transition-colors">Prev</button>
        <span className="text-xs font-bold text-slate-500">Page {page} of {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 bg-white border border-slate-200 text-xs rounded-xl disabled:opacity-50 font-bold shadow-sm hover:bg-slate-50 transition-colors">Next</button>
      </div>
    </div>
  );
}