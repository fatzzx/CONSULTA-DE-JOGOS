import GameCard from "./GameCard";

export default function GameList({ games, loading, hasSearched }) {
  if (loading) {
    return (
      <div className="text-center text-white text-xl py-10">
        Carregando jogos...
      </div>
    );
  }

  if (hasSearched && games.length === 0) {
    return (
      <div className="text-center text-white text-lg py-10">
        Nenhum jogo encontrado.
      </div>
    );
  }

  return (
    <section className="flex flex-wrap justify-center gap-8 px-6 pb-20">
      {games.map((game, idx) => (
        <GameCard
          key={idx}
          title={game.title}
          genres={game.genres}
          rating={game.rating}
          image={game.image}
          id={game.id}
        />
      ))}
    </section>
  );
}
