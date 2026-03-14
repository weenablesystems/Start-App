import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-1 bg-stone-100 dark:bg-stone-700 p-1 rounded-xl">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded-lg ${theme === 'light' ? 'bg-white dark:bg-stone-600 shadow-sm' : 'hover:bg-stone-200 dark:hover:bg-stone-600'}`}
        title="Light Mode"
      >
        <Sun className="h-4 w-4 text-stone-600 dark:text-stone-300" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white dark:bg-stone-600 shadow-sm' : 'hover:bg-stone-200 dark:hover:bg-stone-600'}`}
        title="Dark Mode"
      >
        <Moon className="h-4 w-4 text-stone-600 dark:text-stone-300" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded-lg ${theme === 'system' ? 'bg-white dark:bg-stone-600 shadow-sm' : 'hover:bg-stone-200 dark:hover:bg-stone-600'}`}
        title="System Mode"
      >
        <Monitor className="h-4 w-4 text-stone-600 dark:text-stone-300" />
      </button>
    </div>
  );
}
