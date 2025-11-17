import CatalogCard from "../ui/catalog/CatalogCard";
import GenreFilter from "../ui/catalog/GenreFilter";
import SeeMoreButton from "../ui/catalog/SeeMoreButton";
import { fetchGames, GamesResponse } from "@/services/gamesService";

interface CatalogScreenProps {
  searchParams?: { genre?: string; page?: string };
}

export default async function CatalogScreen({ searchParams }: CatalogScreenProps) {
  const page = searchParams?.page || '1';
  const genre = searchParams?.genre || '';
  
  let data: GamesResponse;
  try {
    data = await fetchGames(genre, page);
  } catch (error) {
    return (
      <div className="p-24">
        <p className="text-red-600">Error loading games</p>
      </div>
    );
  }

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