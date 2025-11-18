'use client';

import { useSearchParams } from "next/navigation";
import { useGames } from "@/utils/shared/hooks/useGames";
import CatalogCard from "../ui/catalog/CatalogCard";
import GenreFilter from "../ui/catalog/GenreFilter";
import SeeMoreButton from "../ui/catalog/SeeMoreButton";

export default function CatalogScreen() {
  const searchParams = useSearchParams();

  const page = searchParams.get("page") || "1";
  const genre = searchParams.get("genre") || "";

  const { data, error } = useGames(genre, page);

  if (error) {
    return (
      <div className="p-24">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="w-full max-w-[1600px] mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800">Top Sellers</h1>
        <GenreFilter 
          availableFilters={data.availableFilters} 
          currentGenre={genre || null}
        />
      </div>

      <CatalogCard data={data} />

      <SeeMoreButton 
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        currentGenre={genre || null}
      />
    </div>
  );
}
