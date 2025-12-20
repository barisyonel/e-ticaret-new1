'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/lib/repositories/CategoryRepository';
import CategoryIcon from './CategoryIcon';

interface AllCategoriesMenuProps {
  categories: Category[];
}

export default function AllCategoriesMenu({ categories }: AllCategoriesMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get all main categories (parent_id IS NULL) and filter out test categories
  const mainCategories = categories
    .filter(cat => cat.parentId === null && cat.isActive)
    .filter(cat => !cat.name.toLowerCase().includes('deneme')) // Filter out test categories
    .sort((a, b) => {
      // Sort by displayOrder first, then by name
      if (a.displayOrder !== b.displayOrder) {
        return (a.displayOrder || 0) - (b.displayOrder || 0);
      }
      return a.name.localeCompare(b.name, 'tr');
    });

  // Note: We only show main categories in the sidebar, not all flattened categories

  if (mainCategories.length === 0) {
    return null;
  }

  const handleCategoryHover = (category: Category) => {
    setSelectedCategory(category);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    // Small delay to allow moving to mega menu
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setSelectedCategory(null);
    }, 200);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* TÜM KATEGORİLER Button - Premium Design */}
      <button className={`
        flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white
        transition-all duration-300 h-full
        ${isOpen
          ? 'bg-accent-yellow text-primary-blue-dark shadow-lg'
          : 'hover:bg-white/10 hover:text-accent-yellow'
        }
        border-r-2 border-white/20 rounded-l-lg
        group
      `}>
        <svg
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span>TÜM KATEGORİLER</span>
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Mega Menu Dropdown - Premium Design */}
      {isOpen && (
        <div
          className="fixed top-[calc(96px)] left-0 right-0 bg-white border-t-2 border-accent-yellow shadow-2xl z-[100] animate-fadeInUp"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Top Gradient Bar */}
          <div className="h-1 bg-gradient-to-r from-primary-blue via-accent-yellow to-primary-blue"></div>

          <div className="container mx-auto px-4">
            <div className="flex">
              {/* Left Sidebar - Premium Design */}
              <div className="w-72 bg-gradient-to-b from-gray-50 to-white border-r-2 border-gray-100 max-h-[600px] overflow-y-auto">
                <div className="p-4">
                  <div className="mb-4 pb-3 border-b-2 border-accent-yellow/30">
                    <h3 className="text-lg font-black text-primary-blue flex items-center gap-2">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      Kategoriler
                    </h3>
                  </div>

                  {mainCategories.map((category) => {
                    const isSelected = selectedCategory?.id === category.id;
                    const hasChildren = category.children && category.children.length > 0;

                    return (
                      <div
                        key={category.id}
                        className={`
                          relative mb-1 rounded-lg transition-all duration-200
                          ${isSelected
                            ? 'bg-primary-blue shadow-md'
                            : 'hover:bg-white hover:shadow-sm'
                          }
                        `}
                        onMouseEnter={() => handleCategoryHover(category)}
                      >
                        <Link
                          href={`/products?category=${category.slug}`}
                          className={`
                            flex items-center justify-between px-4 py-3 text-sm transition-all duration-200
                            ${isSelected
                              ? 'text-white font-bold'
                              : 'text-gray-700 hover:text-primary-blue font-semibold'
                            }
                          `}
                        >
                          <span className="flex items-center gap-3">
                            <div className={`flex-shrink-0 ${isSelected ? 'text-white' : 'text-primary-blue'}`}>
                              <CategoryIcon slug={category.slug} className="w-5 h-5" />
                            </div>
                            <span>{category.name}</span>
                          </span>
                          {hasChildren && (
                            <svg
                              className={`w-4 h-4 transition-transform ${isSelected ? 'text-white' : 'text-gray-400'}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </Link>

                        {/* Selected Indicator */}
                        {isSelected && (
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-accent-yellow rounded-l-full"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side - Mega Menu Content - Premium Design */}
              {selectedCategory && (
                <div className="flex-1 p-8 max-h-[600px] overflow-y-auto">
                  {/* Selected Category Header */}
                  <div className="mb-6 pb-4 border-b-2 border-gray-100">
                    <Link
                      href={`/products?category=${selectedCategory.slug}`}
                      className="group flex items-center gap-4"
                    >
                      <div className="flex-shrink-0">
                        <CategoryIcon slug={selectedCategory.slug} className="w-10 h-10 text-primary-blue" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary-blue transition-colors">
                          {selectedCategory.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Tüm alt kategorileri görüntüle</p>
                      </div>
                      <svg className="w-6 h-6 text-gray-400 group-hover:text-primary-blue group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>

                  {/* If selected category has subcategories, show them */}
                  {selectedCategory.children && selectedCategory.children.length > 0 ? (
                    <div className="grid grid-cols-4 gap-8">
                      {selectedCategory.children.map((subcategory) => (
                        <div key={subcategory.id} className="space-y-4 group/sub">
                          {/* Subcategory Header */}
                          <Link
                            href={`/products?category=${subcategory.slug}`}
                            className="block font-black text-gray-900 hover:text-primary-blue transition-colors text-lg border-b-2 border-accent-yellow/30 pb-2 group-hover/sub:border-accent-yellow"
                          >
                            {subcategory.name}
                          </Link>

                          {/* Child Categories */}
                          {subcategory.children && subcategory.children.length > 0 && (
                            <ul className="space-y-2 mt-3">
                              {subcategory.children.map((childCategory) => (
                                <li key={childCategory.id}>
                                  <Link
                                    href={`/products?category=${childCategory.slug}`}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-blue transition-colors py-2 px-3 rounded-lg hover:bg-gray-50 group/item font-medium"
                                  >
                                    <span className="w-2 h-2 bg-gray-300 rounded-full group-hover/item:bg-primary-blue group-hover/item:scale-125 transition-all"></span>
                                    <span>{childCategory.name}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="flex justify-center mb-4">
                        <CategoryIcon slug={selectedCategory.slug} className="w-16 h-16 text-primary-blue" />
                      </div>
                      <p className="text-gray-500 text-lg">Bu kategoride henüz alt kategori bulunmamaktadır.</p>
                      <Link
                        href={`/products?category=${selectedCategory.slug}`}
                        className="inline-block mt-6 bg-primary-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-blue-dark transition-all transform hover:scale-105"
                      >
                        Tüm Ürünleri Gör
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State - No Category Selected */}
              {!selectedCategory && (
                <div className="flex-1 p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg font-semibold">Bir kategori seçin</p>
                    <p className="text-gray-400 text-sm mt-2">Alt kategorileri görmek için sol menüden bir kategori seçin</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
