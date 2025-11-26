'use client';

import { useState } from 'react';
import MobileMenu from './MobileMenu';
import { Category } from '@/lib/repositories/CategoryRepository';

interface NavbarMobileProps {
  categories: Category[];
}

export default function NavbarMobile({ categories }: NavbarMobileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Enhanced Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="relative p-3 text-white hover:text-accent-yellow hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/10 hover:border-accent-yellow/30 hover:shadow-lg hover:shadow-accent-yellow/20 transform hover:scale-110 group"
        aria-label="Menüyü Aç"
      >
        {/* Animated Hamburger Icon */}
        <div className="relative w-6 h-6 flex flex-col justify-center items-center">
          <div className="w-6 h-0.5 bg-current rounded-full transition-all duration-300 group-hover:w-7 transform origin-center"></div>
          <div className="w-5 h-0.5 bg-current rounded-full mt-1.5 transition-all duration-300 group-hover:w-6 transform origin-center"></div>
          <div className="w-4 h-0.5 bg-current rounded-full mt-1.5 transition-all duration-300 group-hover:w-5 transform origin-center"></div>
        </div>
        
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-xl bg-accent-yellow/20 opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
      </button>

      <MobileMenu
        categories={categories}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
}