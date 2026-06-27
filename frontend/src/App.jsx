import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import MyBookshelf from './pages/MyBookshelf.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminPanel from './pages/AdminPanel.jsx';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // home, shelf, dashboard, admin, login
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Persist login state across page refreshes
    fetch('http://localhost:5555/api/me', { credentials: 'include' })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400 text-xs font-semibold">Initializing Hub Security...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-600">
      <Navbar user={user} setUser={setUser} currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && <Home user={user} setCurrentView={setCurrentView} />}
        {currentView === 'login' && <Login setUser={setUser} setCurrentView={setCurrentView} />}
        {currentView === 'shelf' && <MyBookshelf />}
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'admin' && <AdminPanel />}
      </main>
    </div>
  );
}