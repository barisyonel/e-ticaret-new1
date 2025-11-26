'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/app/auth/actions';

interface UserMenuProps {
  userName: string;
  userRole: string;
}

export default function UserMenu({ userName, userRole }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await logoutUser();
    // logoutUser already redirects, but we'll use window.location for full page refresh
    window.location.href = '/';
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Enhanced User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 lg:px-4 lg:py-2.5 text-white hover:text-blue-200 transition-all duration-300 focus:outline-none rounded-xl hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-blue-200/30 hover:shadow-lg hover:shadow-blue-200/20 transform hover:scale-105 group"
      >
        {/* User Avatar */}
        <div className="relative">
          <div className="w-8 h-8 lg:w-9 lg:h-9 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 group-hover:border-white/40 transition-all duration-300">
            <span className="text-primary-blue-dark font-bold text-sm lg:text-base">
              {userName.charAt(0).toUpperCase()}
            </span>
          </div>
          {/* Online Status Indicator */}
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm animate-pulse"></div>
        </div>
        
        {/* User Name - Enhanced */}
        <div className="hidden sm:block text-left">
          <span className="font-semibold text-sm lg:text-base truncate max-w-[80px] lg:max-w-none block group-hover:text-blue-200 transition-colors duration-300">
            {userName}
          </span>
          <span className="text-xs text-white/70 group-hover:text-blue-200/80 transition-colors duration-300">
            {userRole === 'ADMIN' ? 'Yönetici' : 'Kullanıcı'}
          </span>
        </div>
        
        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 transition-all duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-blue-200' : 'group-hover:text-blue-200'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Enhanced Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl py-2 z-50 border border-gray-200/50 animate-in slide-in-from-top-2 duration-300">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-200 to-blue-300 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-primary-blue-dark font-bold">
                  {userName.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500 bg-primary-blue/10 px-2 py-0.5 rounded-full inline-block">
                  {userRole === 'ADMIN' ? '👑 Yönetici' : '👤 Kullanıcı'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/profile"
              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:text-primary-blue hover:bg-gradient-to-r hover:from-primary-blue/5 hover:to-blue-200/5 transition-all duration-300 border-l-4 border-transparent hover:border-l-primary-blue transform hover:scale-[1.02]"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Profilim</span>
                <p className="text-xs text-gray-500">Hesap bilgilerinizi görüntüleyin</p>
              </div>
            </Link>
            
            <Link
              href="/profile/orders"
              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:text-primary-blue hover:bg-gradient-to-r hover:from-primary-blue/5 hover:to-blue-200/5 transition-all duration-300 border-l-4 border-transparent hover:border-l-primary-blue transform hover:scale-[1.02]"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Siparişlerim</span>
                <p className="text-xs text-gray-500">Geçmiş siparişlerinizi inceleyin</p>
              </div>
            </Link>
            
            <Link
              href="/profile/settings"
              className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:text-primary-blue hover:bg-gradient-to-r hover:from-primary-blue/5 hover:to-blue-200/5 transition-all duration-300 border-l-4 border-transparent hover:border-l-primary-blue transform hover:scale-[1.02]"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Ayarlar</span>
                <p className="text-xs text-gray-500">Hesap ayarlarınızı yönetin</p>
              </div>
            </Link>
            
            {userRole === 'ADMIN' && (
              <Link
                href="/admin"
                className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:text-primary-blue hover:bg-gradient-to-r hover:from-primary-blue/5 hover:to-blue-200/5 transition-all duration-300 border-l-4 border-transparent hover:border-l-primary-blue transform hover:scale-[1.02]"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <span className="font-medium">Yönetim Paneli</span>
                  <p className="text-xs text-gray-500">Admin paneline erişim</p>
                </div>
              </Link>
            )}
          </div>
          
          {/* Logout Section */}
          <div className="border-t border-gray-200/50 mt-2 pt-2">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-red-600 hover:text-red-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-50/50 transition-all duration-300 border-l-4 border-transparent hover:border-l-red-500 transform hover:scale-[1.02]"
            >
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <div>
                <span className="font-medium">Çıkış Yap</span>
                <p className="text-xs text-red-500">Hesabınızdan güvenli çıkış</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}