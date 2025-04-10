import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="min-h-screen flex flex-col w-screen bg-gray-400">
      {/* Header stays at top */}
      <header className="shrink-0">
        <Header />
      </header>

      {/* Main content takes available space */}
      <main className="flex-1 w-full overflow-auto">
        <Outlet />
      </main>

      {/* Footer stays at bottom */}
      <footer className="shrink-0">
        <Footer />
      </footer>
    </div>
  ) : null;
}

export default App;
