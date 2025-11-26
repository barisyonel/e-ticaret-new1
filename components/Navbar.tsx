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
      {/* Utility Bar - Modern Gradient Top Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-primary-blue-darker via-primary-blue-dark to-primary-blue-darker backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center h-10 text-sm">
            <div className="flex items-center space-x-8">
              <Link href="/hakkimizda" className="text-white/90 hover:text-white transition-all duration-300 font-medium hover:scale-105 transform relative group">
                <span className="relative z-10">Hakkımızda</span>
                <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
              <Link href="/iletisim" className="text-white/90 hover:text-white transition-all duration-300 font-medium hover:scale-105 transform relative group">
                <span className="relative z-10">Yardım & Destek</span>
                <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar - Ultra Modern Design with Glassmorphism */}
      <nav className="bg-gradient-to-r from-primary-blue via-primary-blue-light to-primary-blue backdrop-blur-xl shadow-2xl sticky top-0 z-[60] border-b-2 border-white/30 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="container mx-auto px-3 sm:px-4 w-full relative z-10">
          {/* Mobile Layout */}
          <div className="lg:hidden flex items-center justify-between h-16 min-h-[64px] w-full overflow-hidden">
            {/* Mobile Menu Button & Logo */}
            <div className="flex items-center space-x-3 flex-shrink-0 min-w-0 flex-1">
              <NavbarMobile categories={categories} />
              <Link href="/" className="text-base sm:text-lg md:text-xl font-black text-white drop-shadow-2xl hover:text-blue-200 transition-all duration-300 truncate transform hover:scale-105 relative group">
                <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-white transition-all duration-300">
                  New Holland
                </span>
              </Link>
            </div>

            {/* Mobile Search Icon */}
            <Link
              href="/products"
              className="hidden sm:flex p-3 text-white hover:text-accent-yellow hover:bg-white/10 rounded-xl transition-all duration-300 flex-shrink-0 backdrop-blur-sm border border-white/20 hover:border-accent-yellow/50 hover:shadow-lg hover:shadow-accent-yellow/20 transform hover:scale-110"
              aria-label="Ara"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
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
            </Link>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-1 flex-shrink-0 min-w-0">
              {user ? (
                <NavbarClient user={user} />
              ) : (
                <LoginRegisterButtons variant="mobile" />
              )}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center justify-between h-20">
            {/* Logo - Enhanced with Glassmorphism */}
            <Link href="/" className="flex items-center space-x-4 flex-shrink-0 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-blue-200/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-white/20 to-blue-200/10 rounded-2xl p-3 group-hover:from-white/30 group-hover:to-blue-200/20 transition-all duration-500 backdrop-blur-sm border border-white/20 group-hover:border-white/40">
                  <span className="text-3xl font-black bg-gradient-to-br from-white to-blue-200 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-white transition-all duration-500">
                    NH
                  </span>
                </div>
              </div>
              <div className="group-hover:transform group-hover:scale-105 transition-all duration-300">
                <div className="text-2xl font-black bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent leading-tight group-hover:from-blue-200 group-hover:to-white transition-all duration-500">
                  New Holland
                </div>
                <div className="text-xs text-white/80 font-semibold group-hover:text-accent-yellow/90 transition-all duration-300">
                  Yedek Parça Bayi
                </div>
              </div>
            </Link>

            {/* Search Bar - Enhanced */}
            <div className="flex-1 max-w-3xl mx-8">
              <SearchBar />
            </div>

            {/* User Actions - Enhanced */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {user ? (
                <NavbarClient user={user} />
              ) : (
                <LoginRegisterButtons variant="desktop" />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Category Menu Bar - Modern Glassmorphism Design */}
      <div className="hidden lg:block bg-gradient-to-r from-primary-blue-dark via-primary-blue-darker to-primary-blue-dark backdrop-blur-xl border-t border-white/20 sticky top-[80px] z-40 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center h-14">
            {/* TÜM KATEGORİLER Button with Enhanced Design */}
            <AllCategoriesMenuServer />

            {/* Main Categories */}
            <div className="flex-1 overflow-x-auto">
              <MegaMenuServer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
