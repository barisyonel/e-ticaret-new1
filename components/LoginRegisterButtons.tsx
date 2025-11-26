'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginRegisterButtonsProps {
  variant?: 'mobile' | 'desktop';
}

export default function LoginRegisterButtons({ variant = 'desktop' }: LoginRegisterButtonsProps) {
  const router = useRouter();

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/auth/login');
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/auth/register');
  };

  if (variant === 'mobile') {
    return (
      <Link
        href="/auth/login"
        className="relative text-sm text-white hover:text-blue-200 transition-all duration-300 font-bold px-4 py-2 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-300/20 transform hover:scale-105 group overflow-hidden"
        onClick={handleLoginClick}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="relative z-10">Giriş</span>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Login Button - Enhanced */}
      <Link
        href="/auth/login"
        className="relative text-white hover:text-blue-200 transition-all duration-300 font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-300/50 hover:shadow-lg hover:shadow-blue-300/20 transform hover:scale-105 group overflow-hidden"
        onClick={handleLoginClick}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 flex items-center space-x-2">
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <span>Giriş Yap</span>
        </div>
      </Link>

      {/* Register Button - Enhanced with Gradient */}
      <Link
        href="/auth/register"
        className="relative bg-gradient-to-r from-white to-blue-100 text-primary-blue-dark px-6 py-2.5 rounded-xl hover:from-blue-100 hover:to-white transition-all duration-300 text-sm font-bold shadow-lg hover:shadow-xl hover:shadow-blue-300/30 transform hover:scale-105 group overflow-hidden border border-blue-300/20"
        onClick={handleRegisterClick}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
        
        <div className="relative z-10 flex items-center space-x-2">
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span>Kayıt Ol</span>
        </div>
      </Link>
    </div>
  );
}