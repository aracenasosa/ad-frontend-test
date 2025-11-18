import Image from "next/image";
import AddToCartButton from "../common/AddToCartButton";
import { GamesResponse } from "@/services/gamesService";

function CatalogCard({ data }: { data: GamesResponse | undefined }) {
  const { games, totalPages, currentPage } =
    data || { games: [], totalPages: 0, currentPage: 0 };

  if (!games || games.length === 0) {
    return <p className="text-gray-600 text-center py-12">No games found</p>;
  }

  return (
    <>
      {/* Cards container */}
      <div className="flex flex-wrap justify-center gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="
              w-full
              max-w-[340px]           
              sm:max-w-none
              sm:basis-[calc(50%-12px)]
              lg:basis-[calc(33.333%-16px)]
              bg-white rounded-lg border border-gray-300
              overflow-hidden hover:shadow-lg
              transition-shadow duration-300
              flex flex-col
            "
          >
            <div className="relative">
              <Image
                src={game.image}
                alt={game.name}
                width={400}
                height={256}
                className="w-full h-56 sm:h-64 object-cover"
              />
              {game.isNew && (
                <span
                  className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded"
                  style={{ backgroundColor: "#F5F5F4", color: "#3B3B3B" }}
                >
                  New
                </span>
              )}
            </div>

            <div className="p-5 flex flex-col flex-grow">
              <p className="text-xs uppercase text-gray-500 mb-2">
                {game.genre}
              </p>

              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 flex-1 break-words">
                  {game.name.toUpperCase()}
                </h3>
                <span className="text-lg sm:text-xl font-bold text-gray-800 sm:ml-2">
                  ${game.price.toFixed(2)}
                </span>
              </div>

              <AddToCartButton game={game} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-gray-600">
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </>
  );
}

export default CatalogCard;
