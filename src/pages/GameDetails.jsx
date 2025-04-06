import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

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
          <div className="mb-4">
            <span className="text-sm text-gray-400">Gêneros:</span>
            <p>{game.genres.map((g) => g.name).join(", ")}</p>
          </div>
          <div className="mb-4">
            <span className="text-sm text-gray-400">Plataformas:</span>
            <p>{game.platforms.map((p) => p.platform.name).join(", ")}</p>
          </div>
          <div className="mb-6">
            <span className="text-sm text-gray-400">Loja(s):</span>
            <ul className="list-disc list-inside">
              {stores.map((store) => (
                <li key={store.id}>
                  <a
                    href={`https://${store.store.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline"
                  >
                    {store.store.name}
                  </a>
                </li>
              ))}
            </ul>
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
