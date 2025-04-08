import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import PlatformIcon from "../components/PlatformIcon";
import { storeLogos } from "../utils/storeLogos";

export default function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [priceData, setPriceData] = useState(null);
  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    async function fetchDetails() {
      try {
        const gameRes = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${RAWG_API_KEY}`
        );
        const gameData = await gameRes.json();
        setGame(gameData);
        setStores(gameData.stores || []);

        const normalizedName = gameData.name.replace(/:/g, "").trim();
        console.log("Normalized game name:", normalizedName);

        const priceRes = await fetch(
          `https://consulta-jogos-backend.vercel.app/api/gamePrice?name=${encodeURIComponent(
            normalizedName
          )}`
        );
        const priceJson = await priceRes.json();
        console.log("Game name sent:", normalizedName);
        console.log("Price API response:", priceJson);
        if (!priceJson.error) {
          setPriceData(priceJson);
          console.log("Price data set:", priceJson);
        } else {
          console.log("Price API error:", priceJson.error);
          if (priceJson.error === "Game not found.") {
            setPriceData({ isFree: true });
          }
        }
      } catch (err) {
        console.error("Error fetching game details or price data:", err);
      } finally {
        setLoading(false);
      }
    }

    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/${id}/reviews?key=${RAWG_API_KEY}`
        );
        const data = await res.json();
        setReviews(data.results || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchDetails();
    fetchReviews();
  }, [id]);

  if (loading) return <Loading />;
  if (!game) return <div className="text-white p-4">Game not found.</div>;

  const groupedPlatforms = {};
  game.platforms.forEach(({ platform }) => {
    let key = "other";
    if (/playstation/i.test(platform.name)) key = "playstation";
    else if (/xbox/i.test(platform.name)) key = "xbox";
    else if (/pc/i.test(platform.name)) key = "pc";
    else if (/nintendo/i.test(platform.name)) key = "nintendo";
    else if (/mac|linux/i.test(platform.name)) key = "desktop";
    else if (/ios|android/i.test(platform.name)) key = "mobile";

    if (!groupedPlatforms[key]) groupedPlatforms[key] = [];
    groupedPlatforms[key].push(platform.name);
  });

  const uniqueStores = Array.from(
    new Map(stores.map((s) => [s.store.name, s])).values()
  );

  console.log("Rendering with priceData:", priceData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
      >
        ← Back
      </button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div>
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-auto object-cover rounded-2xl shadow-xl"
          />
        </div>

        <div>
          <h1 className="text-4xl font-extrabold mb-4">{game.name}</h1>

          <p className="text-gray-300 mb-6 leading-relaxed text-lg">
            {game.description_raw}
          </p>

          <div className="mb-4">
            <span className="text-sm text-gray-400">Rating:</span>
            <p className="text-xl">
              ⭐ {game.rating} / 5 ({game.ratings_count} ratings)
            </p>
          </div>

          {game.metacritic && (
            <div className="mb-4">
              <span className="text-sm text-gray-400">Metacritic:</span>
              <p className="text-xl text-green-400">{game.metacritic}</p>
            </div>
          )}

          <div className="mb-4">
            <span className="text-sm text-gray-400">Genres:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {game.genres.map((g) => (
                <span
                  key={g.id}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <span className="text-sm text-gray-400">Platforms:</span>
            <div className="flex flex-col gap-1 mt-1">
              {Object.entries(groupedPlatforms).map(([key, names]) => (
                <div key={key} className="flex items-start gap-2">
                  <PlatformIcon name={key} />
                  <span className="text-sm">{names.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>

          {priceData ? (
            priceData.isFree ? (
              <div className="mb-6 mt-8">
                <h2 className="text-xl font-semibold mb-2 text-yellow-300">
                  💸 Offers in Digital Stores
                </h2>
                <p className="text-green-400">This game is free!</p>
              </div>
            ) : (
              <div className="mb-6 mt-8">
                <h2 className="text-xl font-semibold mb-2 text-yellow-300">
                  💸 Offers in Digital Stores
                </h2>
                <div className="flex flex-col gap-3">
                  {priceData.offers.map((offer, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-gray-800 px-4 py-3 rounded-lg shadow-sm text-sm"
                    >
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
                        {offer.currentPrice < offer.originalPrice && (
                          <span className="ml-2 text-yellow-400 font-medium">
                            {offer.discount}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-gray-800 rounded-lg text-sm shadow-inner">
                  📉 <strong>Lowest historical price:</strong>{" "}
                  <span className="text-green-400 font-bold">
                    ${priceData.lowestHistoricalPrice.price.toFixed(2)}
                  </span>{" "}
                  on{" "}
                  <span className="text-white font-medium">
                    {new Date(
                      priceData.lowestHistoricalPrice.date
                    ).toLocaleDateString("en-US")}
                  </span>
                </div>
              </div>
            )
          ) : null}

          <div className="mb-6">
            <span className="text-sm text-gray-400">Other stores:</span>
            <div className="flex flex-wrap gap-3 mt-2">
              {uniqueStores.map((store) => {
                const key = store.store.name
                  .toLowerCase()
                  .replace(/\s+/g, "_")
                  .replace(/[^a-z0-9_]/g, "");
                const logo = storeLogos[key];

                return (
                  <a
                    key={store.id}
                    href={`https://${store.store.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-sm transition"
                  >
                    {logo && (
                      <img
                        src={logo}
                        alt={store.store.name}
                        className="w-5 h-5"
                      />
                    )}
                    {store.store.name}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {game.clip?.clip && (
        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold mb-4">Trailer</h2>
          <video
            src={game.clip.clip}
            controls
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {reviews.length > 0 && (
        <div className="max-w-5xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold mb-4">Player Reviews</h2>
          <ul className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <li key={review.id} className="bg-gray-800 p-4 rounded-xl shadow">
                <p className="text-sm text-gray-400 mb-2">
                  {review.user ? review.user.username : "Anonymous"} said:
                </p>
                <div
                  className="text-lg space-y-2"
                  dangerouslySetInnerHTML={{
                    __html: review.text || "No review available.",
                  }}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
