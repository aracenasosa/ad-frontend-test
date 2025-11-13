'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';

interface SeeMoreButtonProps {
  currentPage: number;
  totalPages: number;
  currentGenre?: string | null;
}

export default function SeeMoreButton({ currentPage, totalPages, currentGenre }: SeeMoreButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setLoading } = useLoading();

  const handlePageChange = (newPage: number) => {
    // Check if the page is actually changing
    if (newPage === currentPage) {
      return; // Don't do anything if clicking the same page
    }
    
    // Show loading immediately
    setLoading(true);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    
    if (currentGenre) {
      params.set('genre', currentGenre);
    } else {
      params.delete('genre');
    }
    
    const queryString = params.toString();
    router.push(`${pathname}?${queryString}`);
  };

  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // Don't show anything if we're on page 1 and there's no next page
  if (!hasNextPage && !hasPreviousPage) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-start gap-4">
      {hasPreviousPage && (
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200"
        >
          PREVIOUS
        </button>
      )}
      {hasNextPage && (
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200"
        >
          SEE MORE
        </button>
      )}
    </div>
  );
}

