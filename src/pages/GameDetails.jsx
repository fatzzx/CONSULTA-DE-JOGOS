import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

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
        const gameRes = await fetch(`https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`);
        const gameJson = await gameRes.json();
        setGame(gameJson);

        const normalizedName = gameJson.name.replace(/:/g, "").trim();
        const priceRes = await fetch(
          `https://consulta-jogos-backend.vercel.app/api/gamePrice?name=${encodeURIComponent(normalizedName)}`
        );
        const priceJson = await priceRes.json();
        setPriceData(!priceJson.error ? priceJson : { isFree: true });

        const reviewsRes = await fetch(`https://api.rawg.io/api/games/${id}/reviews?key=${RAWG_API_KEY}`);
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

  const platforms = game.platforms?.map(p => p.platform.name).join(", ");
  const genres = game.genres?.map(g => g.name).join(", ");
  const releaseDate = new Date(game.released).toLocaleDateString("en-US");

  function getMetacriticColor(score) {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    if (score >= 50) return "text-orange-400";
    return "text-red-500";
  }

  return (
    <div className="min-h-screen bg-[#0e1628] text-white">
      {/* Header */}
      <header className="px-6 py-5 border-b border-gray-800 flex justify-between items-center max-w-7xl mx-auto">
        <a href="/" className="flex items-center gap-2">
          <img src="/logoplay.png" alt="PlayWorth Logo" className="h-14 w-auto" />
        </a>
        <nav className="flex gap-6 text-sm text-gray-300">
          <a href="/" className="hover:text-white">Home</a>
          <a href="/trending" className="hover:text-white">Trending</a>
          <a href="/alerts" className="hover:text-white">Alerts</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12 max-w-7xl mx-auto">
        {/* Game Card */}
        <div className="bg-[#131c31] rounded-2xl shadow-lg p-8 lg:p-10 flex flex-col lg:flex-row gap-10">
          {/* Left: Description */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{game.name}</h1>
              <p className="text-sm text-gray-400 mb-6">TAGS: {genres}</p>

              <h2 className="text-md font-semibold text-gray-200 mb-2 uppercase tracking-wide">Description</h2>
              <p className="text-gray-300 leading-relaxed text-sm whitespace-pre-wrap mb-4">
                {game.description_raw}
              </p>

              {/* Rating Summary */}
              {game.rating && (
                <div className="mt-4 text-sm text-gray-200">
                  <p className="text-gray-400 mb-1">Rating:</p>
                  <p className="flex items-center gap-2">
                    <span className="text-yellow-400 text-lg">★</span>
                    <span className="text-white font-semibold">{game.rating.toFixed(2)}</span>
                    <span className="text-gray-400">/ 5 ({game.ratings_count} ratings)</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Image + Info */}
          <div className="relative w-full lg:w-[420px] flex-shrink-0">
            <div className="absolute top-0 left-0 right-0 z-10 bg-black/70 backdrop-blur-sm text-xs text-white px-5 py-3 rounded-t-xl flex flex-wrap justify-between gap-4">
              <div>
                <p className="text-gray-400">DATE</p>
                <p>{releaseDate}</p>
              </div>
              {game.metacritic && (
                <div>
                  <p className="text-gray-400">METACRITIC</p>
                  <p className={`${getMetacriticColor(game.metacritic)} font-semibold`}>
                    {game.metacritic}
                  </p>
                </div>
              )}
              <div>
                <p className="text-gray-400">PLATFORMS</p>
                <p className="max-w-[140px] truncate">{platforms}</p>
              </div>
            </div>

            <img
              src={game.background_image}
              alt={game.name}
              className="rounded-xl w-full h-[440px] object-cover shadow-md"
            />
          </div>
        </div>

        {/* Price Section */}
        {priceData && (
          <div className="mt-10 bg-[#131c31] rounded-xl p-6 shadow-inner">
            <h2 className="text-xl font-semibold text-yellow-300 mb-4">💸 Price & Deals</h2>
            {priceData.isFree ? (
              <p className="text-green-400 font-medium">This game is free to play.</p>
            ) : (
              <>
                <div className="space-y-3">
                  {priceData.offers.map((offer, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg shadow-sm text-sm">
                      <span className="font-medium">{offer.store}</span>
                      <div className="text-right">
                        {offer.currentPrice < offer.originalPrice && (
                          <span className="line-through text-gray-400 mr-2">
                            ${offer.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-green-400 font-semibold">
                          ${offer.currentPrice.toFixed(2)}
                        </span>
                        {offer.discount && (
                          <span className="ml-2 text-yellow-400">{offer.discount}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-300">
                  📉 Lowest historical price:{" "}
                  <span className="text-green-400 font-semibold">
                    ${priceData.lowestHistoricalPrice.price.toFixed(2)}
                  </span>{" "}
                  on{" "}
                  <span className="text-white">
                    {new Date(priceData.lowestHistoricalPrice.date).toLocaleDateString("en-US")}
                  </span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-700 pb-2 flex items-center gap-2">
              🗣 Player Reviews
            </h2>
            <ul className="space-y-6">
              {reviews.slice(0, 5).map((review) => (
                <li
                  key={review.id}
                  className="bg-[#1b2339] border border-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
                      {review.user?.username?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {review.user?.username || "Anonymous"}
                      </p>
                      {review.created && (
                        <p className="text-xs text-gray-400">
                          {new Date(review.created).toLocaleDateString("en-US")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div
                    className="text-gray-200 text-base leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: review.text || "<i>No review text available.</i>",
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
