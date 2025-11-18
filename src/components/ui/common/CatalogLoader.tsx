'use client';

import { useLoading } from '@/contexts/LoadingContext';
import LoadingSpinner from './LoadingSpinner';

export default function CatalogLoader() {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return <LoadingSpinner />;
}
