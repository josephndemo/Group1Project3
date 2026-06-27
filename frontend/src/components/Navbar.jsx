import React from 'react';
import Swal from 'sweetalert2';
import { BookOpen, LogOut, User as UserIcon, Shield } from 'lucide-react';

export default function Navbar({ user, setUser, currentView, setCurrentView }) {
  const handleLogout = async () => {
    const res = await fetch('http://localhost:5555/api/logout', { method: 'POST', credentials: 'include' });
    if (res.ok) {
      setUser(null);
      setCurrentView('home');
      Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Logged out cleanly', showConfirmButton: false, timer: 1500 });
    }
  };

  return (
    <nav className="bg-white border-b border-slate-100 py-4 px-6 sticky top-0 z-50 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
      <h1 className="text-xl font-black text-slate-800 flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('home')}>
        <BookOpen className="w-6 h-6 text-blue-600" /> BookShelf <span className="text-blue-600 font-medium">Hub</span>
      </h1>

      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-bold">
        <button onClick={() => setCurrentView('home')} className={`px-3 py-2 rounded-lg transition-all ${currentView === 'home' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Catalog</button>
        
        {user && (
          <>
            <button onClick={() => setCurrentView('shelf')} className={`px-3 py-2 rounded-lg transition-all ${currentView === 'shelf' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>My Shelf</button>
            <button onClick={() => setCurrentView('dashboard')} className={`px-3 py-2 rounded-lg transition-all ${currentView === 'dashboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Analytics</button>
            {user.role === 'admin' && (
              <button onClick={() => setCurrentView('admin')} className={`px-3 py-2 rounded-lg transition-all text-amber-600 flex items-center gap-1 ${currentView === 'admin' ? 'bg-white shadow-sm' : ''}`}>
                <Shield className="w-3 h-3" /> Admin
              </button>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">{user.username}</p>
              <p className="text-[10px] font-medium text-slate-400 capitalize">{user.role} Account</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-600 bg-slate-50 rounded-xl border border-slate-100 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button onClick={() => setCurrentView('login')} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-sm flex items-center gap-1.5">
            <UserIcon className="w-3.5 h-3.5" /> Sign In
          </button>
        )}
      </div>
    </nav>
  );
}