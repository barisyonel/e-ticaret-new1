'use client';

import Link from 'next/link';
import { getFavorites } from '@/app/server-actions/favoriteActions';
import { useEffect, useState } from 'react';
import UserMenu from './UserMenu';
import NotificationBell from './NotificationBell';
import { useCompare } from '@/app/context/CompareContext';

interface NavbarClientProps {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
}

export default function NavbarClient({ user }: NavbarClientProps) {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const { compareItems } = useCompare();

  useEffect(() => {
    const loadFavoriteCount = async () => {
      try {
        const result = await getFavorites();
        if (result.success && result.data) {
          setFavoriteCount(result.data.length);
        }
      } catch (error) {
        console.error('Error loading favorite count:', error);
      }
    };

    loadFavoriteCount();
  }, []);

  return (
    <div className="flex items-center gap-1 sm:gap-2 lg:gap-3 min-w-0">
      {/* Bildirimler - Modern Design */}
      <NotificationBell />

      {/* Favorilerim - Enhanced Modern Design */}
      <Link
        href="/favorites"
        className="relative flex items-center justify-center p-2 lg:px-4 lg:py-2.5 text-white hover:text-blue-200 transition-all duration-300 group rounded-xl hover:bg-white/10 flex-shrink-0 backdrop-blur-sm border border-white/10 hover:border-blue-200/30 hover:shadow-lg hover:shadow-blue-200/20 transform hover:scale-105"
        title="Favorilerim"
      >
        <div className="relative">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {favoriteCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-200 to-blue-300 text-primary-blue-dark text-[10px] lg:text-xs rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white animate-pulse">
              {favoriteCount > 99 ? '99+' : favoriteCount}
            </div>
          )}
        </div>
        <span className="hidden lg:inline lg:ml-2 text-sm font-semibold group-hover:text-blue-200 transition-colors duration-300">Favorilerim</span>
      </Link>

      {/* Sepetim - Enhanced Modern Design */}
      <Link
        href="/cart"
        className="relative flex items-center justify-center p-2 lg:px-4 lg:py-2.5 text-white hover:text-blue-200 transition-all duration-300 group rounded-xl hover:bg-white/10 flex-shrink-0 backdrop-blur-sm border border-white/10 hover:border-blue-200/30 hover:shadow-lg hover:shadow-blue-200/20 transform hover:scale-105"
        title="Sepetim"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="hidden lg:inline lg:ml-2 text-sm font-semibold group-hover:text-blue-200 transition-colors duration-300">Sepetim</span>
      </Link>

      {/* Karşılaştırma - Enhanced Modern Design */}
      <Link
        href="/compare"
        className="hidden sm:flex relative items-center justify-center p-2 lg:px-4 lg:py-2.5 text-white hover:text-blue-200 transition-all duration-300 group rounded-xl hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-blue-200/30 hover:shadow-lg hover:shadow-blue-200/20 transform hover:scale-105"
        title="Ürün Karşılaştırma"
      >
        <div className="relative">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          {compareItems.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-200 to-blue-300 text-primary-blue-dark text-[10px] lg:text-xs rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center font-bold shadow-lg border-2 border-white animate-pulse">
              {compareItems.length}
            </div>
          )}
        </div>
        <span className="hidden lg:inline lg:ml-2 text-sm font-semibold group-hover:text-blue-200 transition-colors duration-300">Karşılaştır</span>
      </Link>

      {/* Siparişlerim - Enhanced Modern Design */}
      <Link
        href="/profile/orders"
        className="hidden sm:flex relative items-center justify-center p-2 lg:px-4 lg:py-2.5 text-white hover:text-blue-200 transition-all duration-300 group rounded-xl hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-blue-200/30 hover:shadow-lg hover:shadow-blue-200/20 transform hover:scale-105"
        title="Siparişlerim"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <span className="hidden lg:inline lg:ml-2 text-sm font-semibold group-hover:text-blue-200 transition-colors duration-300">Siparişlerim</span>
      </Link>

      {/* User Menu - Enhanced */}
      <div className="ml-1 lg:ml-3 flex-shrink-0">
        <UserMenu userName={user.name} userRole={user.role} />
      </div>
    </div>
  );
}