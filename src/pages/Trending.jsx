import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function Trending() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const RAWG_API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch(
          `https://api.rawg.io/api/games/lists/popular?key=${RAWG_API_KEY}&page_size=12`
        );
        const data = await res.json();
        setGames(data.results);
      } catch (err) {
        console.error("Failed to fetch trending games:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrending();
  }, []);

  function getRatingColor(rating) {
    if (rating >= 4.5) return "text-green-400";
    if (rating >= 4.0) return "text-yellow-400";
    if (rating >= 3.5) return "text-orange-400";
    return "text-red-400";
  }
  
  return (
    <div className="min-h-screen bg-[#0e1628] text-white flex flex-col">
      <Header />

      <main className="flex-grow px-6 py-14 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-3">
          <span>🔥</span> Trending Games
        </h1>

        <p className="text-gray-300 mb-10 max-w-3xl text-base md:text-lg leading-relaxed">
  These are the games gaining the most traction and popularity on the RAWG platform right now.
  Trending games are determined based on user interest, game additions to collections,
  ratings, and overall community buzz — helping you find what’s hot right now.
</p>


        {loading ? (
          <p className="text-gray-400">Loading trending games...</p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game) => (
              <li
                key={game.id}
                className="bg-[#1b2339] p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1 group"
              >
                <Link to={`/jogo/${game.id}`}>
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="w-full h-48 object-cover rounded-lg mb-4 group-hover:brightness-110 transition"
                  />
                  <h2 className="text-lg font-semibold mb-1">{game.name}</h2>
                  <p className="text-gray-400 text-sm mb-2">
                    {game.genres?.map((g) => g.name).join(", ")}
                  </p>
                  <p className={`text-sm font-medium ${getRatingColor(game.rating)}`}>
                    ⭐ {game.rating.toFixed(1)} / 5
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>

      <Footer />
    </div>
  );
}
