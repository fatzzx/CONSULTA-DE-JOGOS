import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchSection from "../components/SearchSection";
import GameList from "../components/GameList";
import Footer from "../components/Footer";
import { gamesAPI } from "../utils/api";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        // Manter sugestões usando RAWG diretamente para ser mais rápido
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(
            searchTerm
          )}&page_size=5`
        );
        const data = await response.json();

        const sorted = data.results
          .sort((a, b) => b.ratings_count - a.ratings_count)
          .map((game) => ({
            id: game.id,
            title: game.name,
          }));

        setSuggestions(sorted);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSearch = async (page = 1) => {
    if (!searchTerm) return;

    setSuggestions([]);
    setHasSearched(true);
    setLoading(true);

    try {
      // Usar a API do backend para busca
      const data = await gamesAPI.search({
        search: searchTerm,
        page: page,
        size: 20,
      });

      const formattedResults = data.games.map((game) => ({
        id: game.id,
        title: game.name,
        genres: game.genres.map((g) => g.name).join(", "),
        rating: game.rating ? game.rating.toFixed(1) : "N/A",
        image: game.background_image,
      }));

      if (page === 1) {
        setResults(formattedResults);
      } else {
        setResults((prev) => [...prev, ...formattedResults]);
      }

      setCurrentPage(page);
      setTotalPages(Math.ceil(data.total / 20));
    } catch (error) {
      console.error("Error fetching games:", error);

      // Fallback para RAWG direta em caso de erro do backend
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(
            searchTerm
          )}&page_size=40`
        );
        const data = await response.json();

        const lowerSearch = searchTerm.toLowerCase();

        const sorted = data.results
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
          .map((game) => ({
            id: game.id,
            title: game.name,
            genres: game.genres.map((g) => g.name).join(", "),
            rating: game.rating.toFixed(1),
            image: game.background_image,
          }));

        setResults(sorted);
      } catch (fallbackError) {
        console.error("Error in fallback search:", fallbackError);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading) {
      handleSearch(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white">
      <Header />
      <main className="flex-grow">
        <SearchSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => handleSearch(1)}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
        <GameList
          games={results}
          loading={loading}
          hasSearched={hasSearched}
          onLoadMore={handleLoadMore}
          canLoadMore={currentPage < totalPages}
        />
      </main>
      <Footer />
    </div>
  );
}
