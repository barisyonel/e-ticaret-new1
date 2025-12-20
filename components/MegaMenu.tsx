'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/lib/repositories/CategoryRepository';
import CategoryIcon from './CategoryIcon';

interface MegaMenuProps {
  categories: Category[];
}

export default function MegaMenu({ categories }: MegaMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  // Only show main categories (parent_id IS NULL) and filter out test categories
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

  if (mainCategories.length === 0) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-0.5 overflow-x-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      {mainCategories.map((category, index) => {
        const hasChildren = category.children && category.children.length > 0;
        const isHovered = hoveredCategory === category.id;

        return (
          <div
            key={category.id}
            className="relative flex-shrink-0 group"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Link
              href={`/products?category=${category.slug}`}
              className={`
                relative flex items-center gap-2 px-5 py-3.5 text-sm font-semibold transition-all duration-300
                ${isHovered
                  ? 'text-accent-yellow'
                  : 'text-white/90 hover:text-white'
                }
                group-hover:bg-white/10 rounded-lg mx-0.5
              `}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <CategoryIcon slug={category.slug} className="w-5 h-5" />
              </div>

              {/* Category Name */}
              <span className="whitespace-nowrap">{category.name}</span>

              {/* Dropdown Arrow */}
              {hasChildren && (
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isHovered ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}

              {/* Active Indicator */}
              {isHovered && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-yellow rounded-t-full animate-fadeInUp"></div>
              )}
            </Link>

            {/* Mega Menu Dropdown - Premium Design */}
            {hasChildren && isHovered && (
              <div className="fixed top-[calc(96px)] left-0 right-0 bg-white border-t-2 border-accent-yellow shadow-2xl z-[100] animate-fadeInUp">
                {/* Top Gradient Bar */}
                <div className="h-1 bg-gradient-to-r from-primary-blue via-accent-yellow to-primary-blue"></div>

                <div className="container mx-auto px-4">
                  <div className="py-8">
                    {/* Category Header */}
                    <div className="mb-6 pb-4 border-b-2 border-gray-100">
                      <Link
                        href={`/products?category=${category.slug}`}
                        className="group flex items-center gap-3"
                        onClick={() => setHoveredCategory(null)}
                      >
                        <div className="flex-shrink-0">
                          <CategoryIcon slug={category.slug} className="w-8 h-8 text-primary-blue" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 group-hover:text-primary-blue transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">Tüm alt kategorileri görüntüle</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-primary-blue group-hover:translate-x-1 transition-all ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>

                    {/* Grid Layout for Subcategories */}
                    <div className="grid grid-cols-5 gap-8">
                      {/* Subcategories */}
                      <div className="col-span-4 grid grid-cols-4 gap-6">
                        {category.children?.map((subcategory) => (
                          <div key={subcategory.id} className="space-y-3 group/sub">
                            {/* Subcategory Header */}
                            <Link
                              href={`/products?category=${subcategory.slug}`}
                              className="block font-bold text-gray-900 hover:text-primary-blue transition-colors text-base border-b-2 border-accent-yellow/30 pb-2 group-hover/sub:border-accent-yellow"
                              onClick={() => setHoveredCategory(null)}
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
                                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-blue transition-colors py-1.5 px-2 rounded-md hover:bg-gray-50 group/item"
                                      onClick={() => setHoveredCategory(null)}
                                    >
                                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full group-hover/item:bg-primary-blue transition-colors"></span>
                                      <span>{childCategory.name}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Category Image (if exists) */}
                      {category.image && (
                        <div className="col-span-1">
                          <Link
                            href={`/products?category=${category.slug}`}
                            onClick={() => setHoveredCategory(null)}
                            className="block group/img"
                          >
                            <div className="relative h-72 w-full rounded-xl overflow-hidden border-2 border-gray-200 hover:border-accent-yellow shadow-lg hover:shadow-2xl transition-all group-hover/img:scale-105">
                              <Image
                                src={category.image}
                                alt={category.name}
                                fill
                                className="object-cover transition-transform duration-500"
                                sizes="200px"
                              />
                              {/* Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
                              {/* Category Name Overlay */}
                              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover/img:opacity-100 transition-opacity">
                                <div className="text-white font-bold text-sm">{category.name}</div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
