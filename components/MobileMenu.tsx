'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Category } from '@/lib/repositories/CategoryRepository';

interface MobileMenuProps {
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ categories, isOpen, onClose }: MobileMenuProps) {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const mainCategories = categories.filter(cat => cat.parentId === null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Enhanced Backdrop with Blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modern Sliding Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gradient-to-br from-white via-gray-50 to-white shadow-2xl z-[55] transform transition-all duration-500 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Enhanced Header with Gradient */}
          <div className="relative bg-gradient-to-r from-primary-blue via-primary-blue-light to-primary-blue p-6 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-accent-yellow/20 rounded-xl p-2 backdrop-blur-sm">
                  <span className="text-xl font-black text-white">NH</span>
                </div>
                <div>
                  <h2 className="text-lg font-black text-white">Menü</h2>
                  <p className="text-xs text-white/80">New Holland</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:border-white/40 transform hover:scale-110"
                aria-label="Menüyü Kapat"
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Enhanced Categories Section */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white">
            <div className="p-4">
              {mainCategories.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 font-medium">Henüz kategori bulunmamaktadır.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {mainCategories.map((category) => {
                    const hasChildren = category.children && category.children.length > 0;
                    const isActive = activeCategory === category.id;

                    return (
                      <div key={category.id} className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <div
                          className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-primary-blue/5 to-accent-yellow/5 border-l-4 border-l-primary-blue' 
                              : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-50/50'
                          }`}
                          onClick={() => setActiveCategory(isActive ? null : category.id)}
                        >
                          <Link
                            href={`/products?category=${category.slug}`}
                            className="flex-1 font-semibold text-gray-800 hover:text-primary-blue transition-colors duration-300"
                            onClick={onClose}
                          >
                            {category.name}
                          </Link>
                          {hasChildren && (
                            <div className={`p-1 rounded-lg transition-all duration-300 ${isActive ? 'bg-primary-blue/10' : 'hover:bg-gray-100'}`}>
                              <svg
                                className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                                  isActive ? 'rotate-90 text-primary-blue' : ''
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Enhanced Subcategories */}
                        {hasChildren && isActive && (
                          <div className="bg-gradient-to-r from-gray-50/50 to-white border-t border-gray-100 p-2 space-y-1 animate-in slide-in-from-top-2 duration-300">
                            {category.children?.map((subcategory) => (
                              <div key={subcategory.id} className="space-y-1">
                                <Link
                                  href={`/products?category=${subcategory.slug}`}
                                  className="block p-3 text-sm text-gray-700 hover:text-primary-blue hover:bg-white rounded-lg transition-all duration-300 font-medium border border-transparent hover:border-primary-blue/20 hover:shadow-sm transform hover:scale-[1.02]"
                                  onClick={onClose}
                                >
                                  <div className="flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-primary-blue rounded-full"></div>
                                    <span>{subcategory.name}</span>
                                  </div>
                                </Link>
                                {/* Enhanced Child categories */}
                                {subcategory.children && subcategory.children.length > 0 && (
                                  <div className="ml-6 space-y-1">
                                    {subcategory.children.map((child) => (
                                      <Link
                                        key={child.id}
                                        href={`/products?category=${child.slug}`}
                                        className="block p-2 text-xs text-gray-600 hover:text-primary-blue hover:bg-white/80 rounded-lg transition-all duration-300 border border-transparent hover:border-primary-blue/10 transform hover:scale-[1.01]"
                                        onClick={onClose}
                                      >
                                        <div className="flex items-center space-x-2">
                                          <div className="w-1 h-1 bg-accent-yellow rounded-full"></div>
                                          <span>{child.name}</span>
                                        </div>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Footer Links */}
          <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white p-4 space-y-2">
            <Link
              href="/hakkimizda"
              className="flex items-center space-x-3 py-3 px-4 text-gray-700 hover:text-primary-blue transition-all duration-300 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-primary-blue/20 transform hover:scale-[1.02]"
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Hakkımızda</span>
            </Link>
            <Link
              href="/iletisim"
              className="flex items-center space-x-3 py-3 px-4 text-gray-700 hover:text-primary-blue transition-all duration-300 rounded-xl hover:bg-white hover:shadow-sm border border-transparent hover:border-primary-blue/20 transform hover:scale-[1.02]"
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Yardım & Destek</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}