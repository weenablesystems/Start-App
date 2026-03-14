import React from 'react';
import { Brain, BookOpen, FileText, Search, LogOut, Menu, X, CheckSquare, ImageIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThemeSwitcher from './ThemeSwitcher';

export default function Layout({ children, activeTab, setActiveTab }: { children: React.ReactNode, activeTab: string, setActiveTab: (tab: string) => void }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { logout } = useAuth();
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Brain },
    { id: 'lessons', label: 'Library', icon: BookOpen },
    { id: 'research', label: 'Research', icon: Search },
    { id: 'plan', label: 'Plan Generator', icon: FileText },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'brand', label: 'Brand Generator', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-library-beige dark:bg-library-brown text-library-brown dark:text-library-beige font-sans">
      <nav className="bg-white dark:bg-library-brown border-b border-library-brown/20 dark:border-library-brown/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-library-burnt-orange" />
              <div className="ml-2">
                <h1 className="text-xl font-bold text-library-brown dark:text-library-beige">🎓Start-App™</h1>
                <p className="text-[10px] font-medium text-library-burnt-orange dark:text-library-dark-yellow tracking-wider uppercase">POWERED BY: 🌐SA-iLabs®</p>
              </div>
            </div>
            <div className="hidden md:flex space-x-8 items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition ${
                    activeTab === item.id ? 'bg-library-dark-yellow/30 text-library-burnt-orange dark:text-library-dark-yellow' : 'text-library-brown/70 dark:text-library-beige/70 hover:bg-library-brown/10 dark:hover:bg-library-beige/10'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </button>
              ))}
              <ThemeSwitcher />
              <button onClick={logout} className="text-library-brown/70 dark:text-library-beige/70 hover:text-library-brown dark:hover:text-library-beige p-2 rounded-full hover:bg-library-brown/10 dark:hover:bg-library-beige/10"><LogOut className="h-5 w-5" /></button>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 p-4 space-y-2">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsMenuOpen(false); }} className="block w-full text-left p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700">{item.label}</button>
          ))}
          <div className="p-3"><ThemeSwitcher /></div>
          <button onClick={logout} className="block w-full text-left p-3 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-700 text-red-600">Logout</button>
        </div>
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
