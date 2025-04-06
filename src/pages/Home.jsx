import { useState } from "react";
import Header from "../components/Header";
import SearchSection from "../components/SearchSection";
import GameList from "../components/GameList";
import Footer from "../components/Footer";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  const handleSearch = async () => {
    if (!searchTerm) return;

    setHasSearched(true);
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(
          searchTerm
        )}&page_size=40`
      );
      const data = await response.json();

      const lowerSearch = searchTerm.toLowerCase();

      const sortedGames = data.results
        .filter((game) => game.genres.length > 0 && game.rating > 0)
        .sort((a, b) => {
          const aName = a.name.toLowerCase();
          const bName = b.name.toLowerCase();

          const aStartsWith = aName.startsWith(lowerSearch);
          const bStartsWith = bName.startsWith(lowerSearch);

          if (aStartsWith && !bStartsWith) return -1;
          if (!aStartsWith && bStartsWith) return 1;

          return b.ratings_count - a.ratings_count;
        })
        .map((game) => {
          const genres = game.genres.map((g) => g.name).join(", ");
          return {
            id: game.id,
            title: game.name,
            genres,
            rating: game.rating.toFixed(1),
            image: game.background_image,
          };
        });

      setGames(sortedGames);
    } catch (error) {
      console.error("Erro ao buscar jogos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <SearchSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />
      <GameList games={games} loading={loading} hasSearched={hasSearched} />
      <Footer />
    </div>
  );
}
