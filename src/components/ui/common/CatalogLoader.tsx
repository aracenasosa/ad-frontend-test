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
    
    if (isInitialMount.current) {
      isInitialMount.current = false;
      prevParamsRef.current = currentParams;
      return;
    }
    
    if (prevParamsRef.current !== currentParams && isLoading) {
      prevParamsRef.current = currentParams;
      
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2200);

      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams, isLoading, setLoading]);

  if (!isLoading) return null;

  return <LoadingSpinner />;
}

