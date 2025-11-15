import { GamesResponse } from "../pages/CatalogScreen";
import Image from "next/image";
import AddToCartButton from "./AddToCartButton";


async function CatalogCard({ data }: { data: GamesResponse | undefined }) {

    const { games, totalPages, currentPage } = data || { games: [], totalPages: 0, currentPage: 0 };

    return (
      <>
        {games && games.length === 0 ? (
          <p className="text-gray-600 text-center py-12">No games found</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="bg-white rounded-lg border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative">
                    <Image
                      src={game.image}
                      alt={game.name}
                      width={400}
                      height={256}
                      className="w-full h-64 object-cover"
                    />
                    {game.isNew && (
                      <span className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded" style={{ backgroundColor: '#F5F5F4', color: '#3B3B3B' }}>
                        New
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-xs uppercase text-gray-500 mb-2">{game.genre}</p>
                    <div className="flex items-baseline justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800 flex-1">
                        {game.name.toUpperCase()}
                      </h3>
                      <span className="text-xl font-bold text-gray-800 ml-2">
                        ${game.price.toFixed(2)}
                      </span>
                    </div>
                    <AddToCartButton game={game} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center text-gray-600">
              <p>Page {currentPage} of {totalPages}</p>
            </div>
          </>
        )}
      </>
    )
}

export default CatalogCard;