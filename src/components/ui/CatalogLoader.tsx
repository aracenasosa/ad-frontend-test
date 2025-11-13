'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import LoadingSpinner from './LoadingSpinner';

export default function CatalogLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isLoading, setLoading } = useLoading();
  const prevParamsRef = useRef<string>('');
  const isInitialMount = useRef(true);

  useEffect(() => {
    const currentParams = searchParams.toString();
    
    // Skip loading on initial mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevParamsRef.current = currentParams;
      return;
    }
    
    // If params changed and we're loading, the navigation happened
    // Now we need to wait for the API to finish (2 second delay) plus rendering time
    if (prevParamsRef.current !== currentParams && isLoading) {
      prevParamsRef.current = currentParams;
      
      // Wait for the API delay (2 seconds) plus a small buffer for React rendering
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2200); // API delay (2000ms) + buffer for rendering

      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, isLoading, setLoading]);

  if (!isLoading) return null;

  return <LoadingSpinner />;
}

