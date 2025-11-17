import { Suspense } from 'react';
import CatalogScreen from "@/components/pages/CatalogScreen";
import LoadingSpinner from "@/components/ui/common/LoadingSpinner";
import CatalogLoader from "@/components/ui/common/CatalogLoader";

export default async function Home({
  searchParams,
}: {
  searchParams: { genre?: string; page?: string };
}) {
  return (
    <>
      <CatalogLoader />
      <main className='flex min-h-screen flex-col items-center justify-between p-8 md:p-12 font-bold text-4xl text-blue-600'>
        <Suspense fallback={<LoadingSpinner />}>
          <CatalogScreen searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  )
}
