import { useState } from "react";
import GameCard from "./GameCard";

export default function GameList({ games, loading, hasSearched }) {
  const [minRating, setMinRating] = useState(0);
  const [sortByRating, setSortByRating] = useState(false);
  const [sortDesc, setSortDesc] = useState(true);

  let filteredGames = games.filter(
    (game) => parseFloat(game.rating) >= minRating
  );

  if (sortByRating) {
    filteredGames = [...filteredGames].sort((a, b) => {
      const ratingA = parseFloat(a.rating);
      const ratingB = parseFloat(b.rating);
      return sortDesc ? ratingB - ratingA : ratingA - ratingB;
    });
  }

  if (loading) {
    return (
      <div className="text-center text-white text-xl py-10">
        Loading games...
      </div>
    );
  }

  if (hasSearched && games.length === 0) {
    return (
      <div className="text-center text-white text-lg py-10">
        No games found.
      </div>
    );
  }

  return (
    <section className="px-6 pb-20">
      {hasSearched && games.length > 0 && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 text-white">
          <div>
            <label className="mr-2">Nota mínima:</label>
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="bg-gray-800 text-white p-2 rounded w-24"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSortByRating((prev) => !prev)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
            >
              {sortByRating ? "Cancelar ordenação" : "Ordenar por nota"}
            </button>

            {sortByRating && (
              <button
                onClick={() => setSortDesc((prev) => !prev)}
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded transition"
              >
                {sortDesc ? "Maior → Menor" : "Menor → Maior"}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Lista de jogos */}
      <div className="flex flex-wrap justify-center gap-8">
        {filteredGames.map((game, idx) => (
          <GameCard
            key={idx}
            title={game.title}
            genres={game.genres}
            rating={game.rating}
            image={game.image}
            id={game.id}
          />
        ))}
      </div>
    </section>
  );
}
