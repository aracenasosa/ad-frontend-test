import { Game } from "@/utils/endpoint";
import CatalogCard from "../ui/CatalogCard";
import GenreFilter from "../ui/GenreFilter";
import SeeMoreButton from "../ui/SeeMoreButton";

export interface GamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

interface CatalogScreenProps {
  searchParams?: { genre?: string; page?: string };
}

export default async function CatalogScreen({ searchParams }: CatalogScreenProps) {
  // Fetch games from the API route
  // For server components, we need to use absolute URLs
  const page = searchParams?.page || '1';
  const genre = searchParams?.genre || '';
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const url = new URL(`${baseUrl}/api/games`);
  url.searchParams.set('page', page);
  if (genre) {
    url.searchParams.set('genre', genre);
  }
  
  const response = await fetch(url.toString(), {
    cache: 'no-store', // Ensure fresh data on each request
  });
  
  if (!response.ok) {
    return (
      <div className="p-24">
        <p className="text-red-600">Error loading games</p>
      </div>
    );
  }

  const data: GamesResponse = await response.json();

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 py-8">
      {/* Top Sellers Title and Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Top Sellers</h1>
        <GenreFilter 
          availableFilters={data.availableFilters} 
          currentGenre={genre || null}
        />
      </div>

      {/* Catalog Cards */}
      <CatalogCard data={data} />

      {/* See More Button */}
      <SeeMoreButton 
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        currentGenre={genre || null}
      />
    </div>
  );
}