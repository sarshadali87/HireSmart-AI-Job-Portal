
import React from 'react';
// FIX: Corrected import path to be relative
import { SearchIcon } from './icons/Icons';

const Hero: React.FC = () => {
  return (
    <div className="text-center py-16 md:py-24 px-4 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white animate-gradient-bg mb-12 shadow-2xl">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
        Find Your Dream Job with AI Precision
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-indigo-100">
        HireSmart uses cutting-edge AI to match you with the perfect career opportunities. Upload your resume and let us do the rest.
      </p>
      <div className="max-w-xl mx-auto flex items-center bg-white/20 rounded-full p-2 backdrop-blur-sm">
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          className="w-full bg-transparent text-white placeholder-indigo-100 border-none focus:ring-0 px-4 py-2"
        />
        <button className="bg-white text-indigo-600 font-semibold rounded-full px-6 py-2 flex items-center space-x-2 hover:bg-indigo-100 transition-colors">
          <SearchIcon className="h-5 w-5" />
          <span>Search</span>
        </button>
      </div>
    </div>
  );
};

export default Hero;
