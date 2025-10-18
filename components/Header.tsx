
import React from 'react';
// FIX: Corrected import path to be relative
import { BriefcaseIcon, SunIcon, MoonIcon, UserCircleIcon } from './icons/Icons';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setView: (view: 'home' | 'dashboard') => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, setView }) => {
  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setView('home')}
          >
            <BriefcaseIcon className="h-8 w-8 text-indigo-500" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Hire<span className="text-indigo-500">Smart</span>
            </h1>
          </div>
          <nav className="flex items-center space-x-4">
            <button
              onClick={() => setView('home')}
              className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              Find a Job
            </button>
            <button
              onClick={() => setView('dashboard')}
              className="hidden sm:block text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
            >
              Recruiter Dashboard
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <SunIcon className="h-6 w-6 text-yellow-400" /> : <MoonIcon className="h-6 w-6 text-gray-600" />}
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors" aria-label="User Profile">
              <UserCircleIcon className="h-7 w-7 text-gray-600 dark:text-gray-300" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
