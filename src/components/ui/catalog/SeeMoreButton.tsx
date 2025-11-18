'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

interface SeeMoreButtonProps {
  currentPage: number;
  totalPages: number;
  currentGenre?: string | null;
}

export default function SeeMoreButton({ currentPage, totalPages, currentGenre }: SeeMoreButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage) {
      return;
    }

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

  if (!hasNextPage && !hasPreviousPage) {
    return null;
  }

  return (
    <div className="mt-8 flex justify-start gap-4">
      {hasPreviousPage && (
        <button 
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-gray-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          PREVIOUS
        </button>
      )}
      {hasNextPage && (
        <button 
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-gray-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          SEE MORE
        </button>
      )}
    </div>
  );
}
