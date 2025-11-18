import { Game } from "@/utils/endpoint";

export interface GamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

export async function fetchGames(
  genre?: string,
  page: string = "1"
): Promise<GamesResponse> {

  const params = new URLSearchParams();
  params.set("page", page);

  if (genre) {
    params.set("genre", genre);
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || '/api/games'}?${params.toString()}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }

  return response.json();
}
