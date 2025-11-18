'use client';

import { useEffect, useState } from 'react';
import { fetchGames, GamesResponse } from '@/services/gamesService';
import { useLoading } from '@/contexts/LoadingContext';

export function useGames(genre?: string, page: string = '1') {
  const [data, setData] = useState<GamesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const result = await fetchGames(genre, page);
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError('Error loading games');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [genre, page, setLoading]);

  return { data, error };
}
