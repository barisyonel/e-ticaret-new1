'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        {/* Enhanced Input with Glassmorphism */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Aradığınız ürün, kategori veya markayı yazınız..."
            className={`w-full px-6 py-4 pr-16 bg-white/95 backdrop-blur-sm rounded-2xl border-2 transition-all duration-300 text-sm text-gray-900 placeholder-gray-500 shadow-lg hover:shadow-xl focus:shadow-2xl ${
              isFocused 
                ? 'border-blue-400 ring-4 ring-blue-400/20 bg-white' 
                : 'border-white/50 hover:border-blue-300/50'
            } focus:outline-none transform hover:scale-[1.02] focus:scale-[1.02]`}
          />
          
          {/* Floating Label Effect */}
          {searchQuery && (
            <div className="absolute -top-2 left-4 px-2 bg-white text-xs font-semibold text-primary-blue rounded-full shadow-sm border border-blue-300/30">
              Arama
            </div>
          )}
          
          {/* Search Icon Background Glow */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
            <button
              type="submit"
              className="relative bg-gradient-to-r from-blue-500 to-blue-400 text-white p-3 rounded-xl hover:from-blue-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 border border-blue-600/20"
              aria-label="Ara"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Enhanced Search Suggestions Placeholder */}
        {isFocused && searchQuery.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-300">
            <div className="p-4">
              <div className="flex items-center space-x-3 text-sm text-gray-600 mb-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Arama önerileri yakında eklenecek</span>
              </div>
              <div className="text-xs text-gray-500 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 border border-gray-200/50">
                <kbd className="px-2 py-1 bg-white rounded border border-gray-300 text-gray-700 font-mono text-xs mr-2">Enter</kbd>
                tuşuna basarak arama yapabilirsiniz
              </div>
            </div>
          </div>
        )}

        {/* Animated Border Effect */}
        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 opacity-20 animate-pulse"></div>
        </div>
      </div>
    </form>
  );
}