import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Auth() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="bg-white dark:bg-stone-800 p-8 rounded-2xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-stone-900 dark:text-white">Welcome to 🎓Start-App™ POWERED BY: 🌐SA-iLabs®</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-900 text-stone-900 dark:text-white"
            required
          />
          <button 
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg font-medium transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
