'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

interface GenreFilterProps {
  availableFilters: string[];
  currentGenre?: string | null;
}

export default function GenreFilter({ availableFilters, currentGenre }: GenreFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValue = currentGenre || 'All';

  const handleGenreChange = (genre: string) => {
    const newGenre = genre === 'All' || genre === '' ? null : genre;
  
    if (newGenre === currentGenre) {
      setIsOpen(false);
      return;
    }
  
    const params = new URLSearchParams(searchParams.toString());
  
    if (genre === 'All' || genre === '') {
      params.delete('genre');
    } else {
      params.set('genre', genre);
    }
  
    params.set('page', '1');
  
    const queryString = params.toString();
    router.push(`${pathname}?${queryString}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-700 font-bold">Genre</span>
      <span className="text-gray-700">|</span>
      <div className="relative ml-4" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-12 text-gray-700 cursor-pointer focus:outline-none bg-transparent border-none p-0"
        >
          <span>{selectedValue}</span>
          <svg
            className="w-4 h-4 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            )}
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
            <div className="py-1">
              <button
                onClick={() => handleGenreChange('All')}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                All
              </button>
              {availableFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleGenreChange(filter)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

