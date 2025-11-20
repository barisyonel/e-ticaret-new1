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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 sm:gap-2 px-1.5 sm:px-2 md:px-3 py-1.5 sm:py-2 text-white hover:text-accent-yellow transition focus:outline-none rounded-lg hover:bg-primary-blue-dark"
      >
        <span className="font-semibold text-[10px] sm:text-xs md:text-sm truncate max-w-[35px] sm:max-w-[60px] md:max-w-none">{userName}</span>
        <svg
          className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
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

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-200">
            <p className="text-sm font-semibold text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">{userRole === 'ADMIN' ? 'Yönetici' : 'Kullanıcı'}</p>
          </div>
          
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)}
          >
            👤 Profilim
          </Link>
          
          <Link
            href="/profile/orders"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)}
          >
            📦 Siparişlerim
          </Link>
          
          <Link
            href="/profile/settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
            onClick={() => setIsOpen(false)}
          >
            ⚙️ Ayarlar
          </Link>
          
          {userRole === 'ADMIN' && (
            <Link
              href="/admin"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
            >
              🔐 Yönetim Paneli
            </Link>
          )}
          
          <div className="border-t border-gray-200 mt-2 pt-2">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              🚪 Çıkış Yap
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

