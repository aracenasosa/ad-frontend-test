import { redirect } from "next/navigation";
import CatalogScreen from "@/components/pages/CatalogScreen";
import CatalogLoader from "@/components/ui/common/CatalogLoader";

export default function Home({
  searchParams,
}: {
  searchParams: { page?: string; genre?: string };
}) {

  // If no page param exists, redirect to page=1 by default
  if (!searchParams.page) {
    redirect("/?page=1");
  }

  return (
    <>
      <CatalogLoader />
      <main className='flex min-h-screen flex-col items-center justify-between p-8 md:p-12 font-bold text-4xl text-blue-600'>
        <CatalogScreen />
      </main>
    </>
  );
}
