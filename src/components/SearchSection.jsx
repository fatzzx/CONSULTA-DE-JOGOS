import { useNavigate } from "react-router-dom";

export default function SearchSection({
  searchTerm,
  setSearchTerm,
  onSearch,
  suggestions,
  setSuggestions,
}) {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSuggestions([]);
      onSearch();
    }
  };

  return (
    <section className="bg-[#121212] text-center py-20 px-6 relative">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Discover if the game is worth it
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
        Compare campaign length, price and popularity to make smarter choices before you play.
      </p>

      <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
        <div className="flex w-full">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for a game..."
              className="w-full p-4 pl-12 pr-10 rounded-l-xl bg-[#1b1b1b] text-white border-none focus:outline-none"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setSuggestions([]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                title="Clear search"
              >
                ✕
              </button>
            )}

            <svg
              className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z"
              />
            </svg>
          </div>

          <button
            type="button"
            onClick={() => {
              setSuggestions([]);
              onSearch();
            }}
            className="px-6 rounded-r-xl bg-[#2f384d] text-white hover:bg-sky-600 transition-colors"
          >
            Search
          </button>
        </div>

        {searchTerm.length >= 3 && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-[#1b1b1b] border border-gray-700 rounded-b-xl z-10 max-h-60 overflow-y-auto">
            {suggestions.slice(0, 5).map((game) => (
              <li
                key={game.id}
                onClick={() => navigate(`/jogo/${game.id}`)}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-left"
              >
                {game.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
