import GameCard from "./GameCard";

export default function GameGrid({ games }) {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {games.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          title={game.name || game.title}
          genres={game.genres?.map ? 
            game.genres.map((g) => g.name).join(", ") : 
            game.genres}
          rating={game.rating}
          image={game.background_image || game.image}
        />
      ))}
    </div>
  );
}