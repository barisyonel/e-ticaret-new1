import Link from 'next/link';
import { getCurrentUser } from '@/app/auth/actions';
import { getCategoryTree } from '@/app/server-actions/categoryActions';
import UserMenu from './UserMenu';
import MegaMenuServer from './MegaMenuServer';
import SearchBar from './SearchBar';
import NavbarClient from './NavbarClient';
import AllCategoriesMenuServer from './AllCategoriesMenuServer';
import NavbarMobile from './NavbarMobile';
import LoginRegisterButtons from './LoginRegisterButtons';

export default async function Navbar() {
  const user = await getCurrentUser();
  const categoriesResult = await getCategoryTree(false);
  const categories = categoriesResult.success && categoriesResult.data ? categoriesResult.data : [];

  return (
    <>
      {/* Top Utility Bar - Premium Design */}
      <div className="hidden lg:block bg-gradient-to-r from-primary-blue-darker via-primary-blue-dark to-primary-blue-darker border-b-2 border-white/20 shadow-lg relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent-yellow rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent-yellow rounded-full blur-2xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center h-11 text-sm">
            {/* Left Side - Contact Info */}
            <div className="flex items-center space-x-6">
              <a href="tel:+904440648" className="flex items-center gap-2 text-white/90 hover:text-accent-yellow transition font-medium group">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>444 0 648</span>
              </a>
              <a href="mailto:info@newhollandbayi.com" className="flex items-center gap-2 text-white/90 hover:text-accent-yellow transition font-medium group">
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@newhollandbayi.com</span>
              </a>
            </div>

            {/* Right Side - Quick Links */}
            <div className="flex items-center space-x-6">
              <Link href="/hakkimizda" className="text-white/90 hover:text-accent-yellow transition font-medium hover:underline decoration-accent-yellow decoration-2 underline-offset-4">
                Hakkımızda
              </Link>
              <Link href="/iletisim" className="text-white/90 hover:text-accent-yellow transition font-medium hover:underline decoration-accent-yellow decoration-2 underline-offset-4">
                Yardım & Destek
              </Link>
              <div className="flex items-center gap-3">
                <a href="#" className="text-white/90 hover:text-accent-yellow transition transform hover:scale-110" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-white/90 hover:text-accent-yellow transition transform hover:scale-110" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar - Premium Modern Design */}
      <nav className="bg-gradient-to-r from-primary-blue via-primary-blue to-primary-blue-dark shadow-2xl sticky top-0 z-50 border-b-4 border-white/30 relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-yellow rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 relative z-10">
          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between h-18 py-3">
            {/* Mobile Menu Button & Logo */}
            <div className="flex items-center space-x-3 flex-shrink-0">
              <NavbarMobile categories={categories} />
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="bg-accent-yellow/20 rounded-xl p-2 group-hover:bg-accent-yellow/30 transition-all border-2 border-accent-yellow/30 group-hover:border-accent-yellow">
                  <span className="text-2xl font-black text-white drop-shadow-lg group-hover:text-accent-yellow transition">
                    NH
                  </span>
                </div>
                <div>
                  <div className="text-lg font-black text-white drop-shadow-lg leading-tight group-hover:text-accent-yellow transition">
                    New Holland
                  </div>
                  <div className="text-[10px] text-white/80 font-bold">
                    Yedek Parça
                  </div>
                </div>
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              <Link
                href="/products"
                className="p-2.5 text-white hover:text-accent-yellow hover:bg-white/10 rounded-xl transition-all"
                aria-label="Ara"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </Link>
              {user ? (
                <NavbarClient user={user} />
              ) : (
                <LoginRegisterButtons variant="mobile" />
              )}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between h-24 py-2">
            {/* Logo - Premium Design */}
            <Link href="/" className="flex items-center space-x-4 flex-shrink-0 group">
              <div className="relative">
                <div className="absolute inset-0 bg-accent-yellow/30 rounded-2xl blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100"></div>
                <div className="relative bg-gradient-to-br from-accent-yellow/20 to-accent-yellow/10 rounded-2xl p-3 group-hover:from-accent-yellow/30 group-hover:to-accent-yellow/20 transition-all border-2 border-accent-yellow/40 group-hover:border-accent-yellow shadow-lg">
                  <span className="text-4xl font-black text-white drop-shadow-2xl group-hover:text-accent-yellow transition">
                    NH
                  </span>
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-white drop-shadow-2xl leading-tight group-hover:text-accent-yellow transition">
                  New Holland
                </div>
                <div className="text-sm text-white/90 font-bold tracking-wide">
                  Yedek Parça Bayi
                </div>
              </div>
            </Link>

            {/* Search Bar - Enhanced */}
            <div className="flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* User Actions - Premium Icons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {user ? (
                <NavbarClient user={user} />
              ) : (
                <LoginRegisterButtons variant="desktop" />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Category Menu Bar - Premium Modern Design */}
      <div className="hidden lg:block bg-gradient-to-r from-primary-blue-dark via-primary-blue-darker to-primary-blue-dark border-t-2 border-white/30 sticky top-[96px] z-40 shadow-2xl relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-40 h-40 bg-accent-yellow rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-yellow rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Subtle Top Border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-yellow/50 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center h-16">
            {/* TÜM KATEGORİLER Button with Mega Menu */}
            <AllCategoriesMenuServer />

            {/* Divider */}
            <div className="h-8 w-px bg-white/20 mx-2"></div>

            {/* Main Categories */}
            <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <MegaMenuServer />
            </div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-yellow/30 to-transparent"></div>
      </div>
    </>
  );
}
