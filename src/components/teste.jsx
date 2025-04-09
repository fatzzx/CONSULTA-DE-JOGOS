{priceData && (
    <div className="mt-16 mb-12">
      <h2 className="text-2xl font-bold mb-8 inline-block border-b-2 border-gray-700 pb-2">
      💸 Price & Deals
      </h2>
      {priceData.isFree ? (
        <p className="text-green-400 font-medium">
          This game is free to play.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {priceData.offers?.map((offer, i) => (
              <div
                key={i}
                className="bg-[#1b1b1b] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
              >
                <div className="bg-[#232323] px-4 py-3 flex items-center justify-between">
                  <span className="font-medium">{offer.store}</span>
                  {offer.discount && (
                    <span className="text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-bold">
                      {offer.discount}
                    </span>
                  )}
                </div>
                <div className="p-4 text-center">
                  {offer.currentPrice < offer.originalPrice && (
                    <span className="line-through text-gray-400 block mb-1">
                      R$ {offer.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-green-400 font-semibold text-xl">
                    R$ {offer.currentPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {priceData.lowestHistoricalPrice && (
            <div className="mt-8 bg-[#1b1b1b] rounded-lg p-4 text-sm text-gray-300 inline-block">
              <span className="text-yellow-400 font-semibold mr-2">📉 Lowest historical price:</span>
              <span className="text-green-400 font-semibold">
                $ {priceData.lowestHistoricalPrice.price.toFixed(2)}
              </span>{" "}
              on{" "}
              <span className="text-white">
                {new Date(
                  priceData.lowestHistoricalPrice.date
                ).toLocaleDateString("en-US")}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  )}