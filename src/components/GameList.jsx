import { useState } from "react";
import GameCard from "./GameCard";

export default function GameList({ games, loading, hasSearched }) {
  const [minRating, setMinRating] = useState(0);

  const filteredGames = games.filter(
    (game) => parseFloat(game.rating) >= minRating
  );

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
        <div className="flex justify-center mb-6">
          <div className="text-white">
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
        </div>
      )}

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
