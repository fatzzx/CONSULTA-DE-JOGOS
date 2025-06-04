import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import FavoriteButton from "../components/FavoriteButton";
import { storeLogos } from "../utils/storeLogos";
import { gamesAPI } from "../utils/api";

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [priceData, setPriceData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    async function fetchData() {
      try {
        const gameRes = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`
        );
        const gameJson = await gameRes.json();
        setGame(gameJson);

        // Usar a função centralizada para buscar preços
        const priceData = await gamesAPI.getPrice(gameJson.name);
        setPriceData(priceData);

        const reviewsRes = await fetch(
          `https://api.rawg.io/api/games/${id}/reviews?key=${RAWG_API_KEY}`
        );
        const reviewsJson = await reviewsRes.json();
        setReviews(reviewsJson.results || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading) return <Loading />;
  if (!game) return <div className="text-white p-4">Game not found.</div>;

  const genres = game.genres?.map((g) => g.name).join(", ");
  const releaseDate = new Date(game.released).toLocaleDateString("en-US");

  // Formatação do jogo para o FavoriteButton
  const gameData = {
    id: parseInt(game.id),
    title: game.name,
    name: game.name,
    image: game.background_image,
    background_image: game.background_image,
  };

  function getMetacriticColor(score) {
    if (score >= 90) return "text-green-400";
    if (score >= 80) return "text-lime-400";
    if (score >= 70) return "text-yellow-400";
    if (score >= 60) return "text-amber-400";
    if (score >= 50) return "text-orange-400";
    if (score >= 40) return "text-orange-500";
    return "text-red-500";
  }

  const renderPlatforms = () => {
    const shown = new Set();
    return game.platforms
      ?.map((p) => {
        const name = p?.platform?.name?.toLowerCase() || "";
        let logoKey = "";
        if (name.includes("playstation")) logoKey = "playstation_store";
        else if (name.includes("xbox")) logoKey = "xbox_store";
        else if (name.includes("nintendo")) logoKey = "nintendo_store";
        else if (name.includes("pc")) logoKey = "pc";
        else if (name.includes("steam")) logoKey = "steam";

        if (logoKey && !shown.has(logoKey)) {
          shown.add(logoKey);
          return (
            <img
              key={logoKey}
              src={storeLogos[logoKey]}
              alt={logoKey}
              title={logoKey.replace("_", " ")}
              className="w-5 h-5 object-contain"
            />
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Header />

      <main className="px-6 max-w-7xl mx-auto">
        <div className="relative bg-[#1b1b1b] rounded-2xl px-6 py-8 mb-16 shadow-lg">
          {/* Botão de favorito usando o componente FavoriteButton */}
          <div className="absolute top-6 right-6 z-10">
            <FavoriteButton
              game={gameData}
              size="large"
              showText={true}
              className="shadow-lg"
            />
          </div>

          <div className="pb-6">
            <h1 className="text-5xl font-bold mb-2">{game.name}</h1>
            <p className="text-sm text-gray-400">TAGS: {genres}</p>
            {game.rating && (
              <div className="mt-3 text-sm">
                <p className="flex items-center gap-2">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="text-white font-semibold">
                    {game.rating.toFixed(2)}
                  </span>
                  <span className="text-gray-400">
                    / 5 ({game.ratings_count} ratings)
                  </span>
                </p>
              </div>
            )}
          </div>

          <div className="py-4 mb-8">
            <div className="flex flex-wrap justify-between text-center gap-6">
              <div>
                <h3 className="text-gray-400 text-sm uppercase mb-1">DATE</h3>
                <p className="font-medium">{releaseDate}</p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm uppercase mb-1">
                  METACRITICS
                </h3>
                <p
                  className={`${getMetacriticColor(
                    game.metacritic
                  )} font-semibold`}
                >
                  {game.metacritic || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm uppercase mb-1">
                  PLATFORMS
                </h3>
                <div className="flex gap-2 justify-center">
                  {renderPlatforms()}
                  {game.platforms?.length > 0 && (
                    <span className="text-xs text-gray-400 self-end ml-1">
                      ({game.platforms.length})
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-gray-400 text-sm uppercase mb-1">PRICE</h3>
                <p className="font-medium">
                  {priceData && priceData.offers?.length > 0
  ? `$ ${priceData.offers[0].currentPrice.toFixed(2)}`
  : <span className="text-gray-400 italic">Unavailable</span>}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="order-1 lg:order-2">
              <img
                src={game.background_image}
                alt={game.name}
                className="w-full rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="order-2 lg:order-1">
              <h2 className="text-xl font-bold mb-4">DESCRIPTION</h2>
              <p className="text-gray-300 leading-relaxed">
                {game.description_raw}
              </p>
            </div>
          </div>
        </div>

        {priceData && (
          <section className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-8 inline-block border-b-2 border-gray-700 pb-2">
              💸 Price & Deals
            </h2>
            {priceData.isFree ? (
              <p className="text-green-400 font-medium">
                This game is free to play.
              </p>
            ) : (
              <>
                <div className="flex flex-col gap-6">
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
                            $ {offer.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-green-400 font-semibold text-xl">
                          $ {offer.currentPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {priceData.lowestHistoricalPrice && (
                  <div className="mt-8 bg-[#1b1b1b] rounded-lg p-4 text-sm text-gray-300 inline-block">
                    <span className="text-yellow-400 font-semibold mr-2">
                      📉 Lowest historical price:
                    </span>
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
          </section>
        )}

        {reviews.length > 0 && (
          <section className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-8 inline-block border-b-2 border-gray-700 pb-2">
              🗣 PLAYERS REVIEWS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.slice(0, 3).map((review) => (
                <div
                  key={review.id}
                  className="bg-[#1b1b1b] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="bg-[#232323] px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {review.user?.username?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {review.user?.username || "Anonymous"}
                      </p>
                      {review.created && (
                        <p className="text-xs text-gray-400">
                          {new Date(review.created).toLocaleDateString("en-US")}
                        </p>
                      )}
                    </div>
                    <div className="ml-auto flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span className="text-sm font-medium">
                        {review.rating || "?"}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div
                      className="text-gray-300 text-sm line-clamp-6"
                      dangerouslySetInnerHTML={{
                        __html:
                          review.text ||
                          "<i>Sem texto de avaliação disponível.</i>",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
