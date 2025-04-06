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
    <section className="text-center py-20 px-6 relative">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Descubra se o jogo vale a pena
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
        Compare tempo de campanha, preço e popularidade para tomar decisões
        inteligentes antes de jogar.
      </p>

      <div className="relative w-full max-w-2xl mx-auto">
        <div className="flex relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Busque um jogo..."
            className="flex-grow p-4 pl-12 pr-10 rounded-l-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSuggestions([]);
              }}
              className="absolute right-28 top-3 text-gray-400 hover:text-white"
              title="Limpar busca"
            >
              ✕
            </button>
          )}

          <button
            onClick={() => {
              setSuggestions([]);
              onSearch();
            }}
            className="px-6 rounded-r-xl bg-sky-500 text-white hover:bg-sky-600 transition-colors"
          >
            Buscar
          </button>

          <svg
            className="absolute top-3 left-4 text-gray-500 w-6 h-6"
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

        {searchTerm.length >= 3 && suggestions.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-gray-800 border border-gray-700 rounded-b-xl z-10 max-h-60 overflow-y-auto">
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
