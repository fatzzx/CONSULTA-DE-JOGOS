import { useState } from "react";
import GameCard from "./GameCard";
import Loading from "./Loading";

export default function GameList({
  games,
  loading,
  hasSearched,
  onLoadMore,
  canLoadMore,
}) {
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

  if (loading && games.length === 0) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loading />
      </div>
    );
  }

  if (hasSearched && games.length === 0 && !loading) {
    return (
      <div className="text-center text-white text-lg py-10">
        <p className="mb-4">Nenhum jogo encontrado.</p>
        <p className="text-gray-400 text-sm">
          Tente pesquisar com termos diferentes ou verifique a ortografia.
        </p>
      </div>
    );
  }

  return (
    <section className="px-6 pb-20">
      {hasSearched && games.length > 0 && (
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6 text-white w-full flex-wrap">
          <div className="flex items-center gap-4 w-full max-w-md">
            <label
              htmlFor="minRatingSlider"
              className="text-sm font-medium whitespace-nowrap"
            >
              Nota mínima:
            </label>
            <input
              id="minRatingSlider"
              type="range"
              min={0}
              max={5}
              step={0.1}
              value={minRating}
              onChange={(e) => setMinRating(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-sky-400 font-semibold w-10 text-center">
              {minRating.toFixed(1)}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
            <label
              htmlFor="sortOrder"
              className="text-sm font-medium whitespace-nowrap"
            >
              Ordenar:
            </label>
            <select
              id="sortOrder"
              value={sortByRating ? (sortDesc ? "desc" : "asc") : "none"}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "none") {
                  setSortByRating(false);
                } else {
                  setSortByRating(true);
                  setSortDesc(value === "desc");
                }
              }}
              className="bg-gray-800 text-white rounded px-4 py-2 border border-gray-600 focus:outline-none focus:border-sky-500"
            >
              <option value="none">Sem ordenação</option>
              <option value="desc">Nota (maior → menor)</option>
              <option value="asc">Nota (menor → maior)</option>
            </select>
          </div>
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-8">
        {filteredGames.map((game, idx) => (
          <GameCard
            key={`${game.id}-${idx}`}
            title={game.title}
            genres={game.genres}
            rating={game.rating}
            image={game.image}
            id={game.id}
          />
        ))}
      </div>

      {/* Botão carregar mais / Loading */}
      {hasSearched && (
        <div className="flex justify-center mt-8">
          {loading ? (
            <div className="flex items-center gap-3 text-white">
              <Loading />
              <span>Carregando mais jogos...</span>
            </div>
          ) : canLoadMore ? (
            <button
              onClick={onLoadMore}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors font-medium"
            >
              Carregar mais jogos
            </button>
          ) : games.length > 0 ? (
            <p className="text-gray-400 text-sm">
              Todos os jogos foram carregados ({games.length}{" "}
              {games.length === 1 ? "jogo encontrado" : "jogos encontrados"})
            </p>
          ) : null}
        </div>
      )}
    </section>
  );
}
