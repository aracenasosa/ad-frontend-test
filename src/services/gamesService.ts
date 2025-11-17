import { Game } from '@/utils/endpoint';

export interface GamesResponse {
  games: Game[];
  availableFilters: string[];
  totalPages: number;
  currentPage: number;
}

const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/api/games';
};

export async function fetchGames(genre?: string, page: string = '1'): Promise<GamesResponse> {
  const baseUrl = getBaseUrl();
  const url = new URL(baseUrl);
  
  url.searchParams.set('page', page);
  if (genre) {
    url.searchParams.set('genre', genre);
  }
  
  const response = await fetch(url.toString(), {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch games');
  }

  return response.json();
}

