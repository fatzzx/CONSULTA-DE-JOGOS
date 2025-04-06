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
      } catch (err) {
        console.error("Erro ao buscar detalhes do jogo:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetails();
  }, [id]);

  if (loading) return <Loading />;
  if (!game) return <div className="text-white p-4">Jogo não encontrado.</div>;

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
      >
        ← Voltar
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
            <span className="text-sm text-gray-400">Avaliação:</span>
            <p className="text-xl">
              ⭐ {game.rating} / 5 ({game.ratings_count} avaliações)
            </p>
          </div>

          {game.metacritic && (
            <div className="mb-4">
              <span className="text-sm text-gray-400">Metacritic:</span>
              <p className="text-xl text-green-400">{game.metacritic}</p>
            </div>
          )}

          <div className="mb-4">
            <span className="text-sm text-gray-400">Gêneros:</span>
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
            <span className="text-sm text-gray-400">Plataformas:</span>
            <div className="flex flex-col gap-1 mt-1">
              {Object.entries(groupedPlatforms).map(([key, names]) => (
                <div key={key} className="flex items-start gap-2">
                  <PlatformIcon name={key} />
                  <span className="text-sm">{names.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <span className="text-sm text-gray-400">Loja(s):</span>
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
    </div>
  );
}
