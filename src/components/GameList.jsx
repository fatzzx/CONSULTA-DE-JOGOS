import GameCard from "./GameCard";

const games = [
  { title: "Cyberpunk 2077", details: "⏱ 40h (Main) · 🏷 R$ 89,90 (Steam)" },
  { title: "Hollow Knight", details: "⏱ 25h · 🏷 R$ 18,90 (GOG)" },
  { title: "Elden Ring", details: "⏱ 55h · 🏷 R$ 199,90 (Xbox)" },
];

export default function GameList() {
  return (
    <section className="flex justify-center items-center md:grid-cols-3 gap-8 px-6 pb-20">
      {games.map((game, idx) => (
        <GameCard key={idx} title={game.title} details={game.details} />
      ))}
    </section>
  );
}
