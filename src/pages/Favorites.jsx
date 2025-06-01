import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { favoritesAPI } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { Trash2, Star } from "lucide-react";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchFavorites();
  }, [isAuthenticated, navigate]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await favoritesAPI.getFavorites();
      setFavorites(data.favorites || []);
    } catch (error) {
      setError(error.message || "Erro ao carregar favoritos");
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (favoriteId, gameTitle) => {
    if (
      !confirm(`Tem certeza que deseja remover "${gameTitle}" dos favoritos?`)
    ) {
      return;
    }

    try {
      setRemovingId(favoriteId);
      await favoritesAPI.removeFavorite(favoriteId);

      // Remover da lista local
      setFavorites((prev) => prev.filter((fav) => fav._id !== favoriteId));
    } catch (error) {
      setError(error.message || "Erro ao remover favorito");
      console.error("Error removing favorite:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const handleGameClick = (gameId) => {
    navigate(`/jogo/${gameId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#121212] text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Loading />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Star className="w-8 h-8 text-yellow-500 fill-current" />
            <h1 className="text-3xl font-bold">Meus Favoritos</h1>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-400 mb-2">
                Nenhum jogo favoritado ainda
              </h2>
              <p className="text-gray-500 mb-6">
                Explore nosso catálogo e adicione seus jogos favoritos aqui!
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Explorar Jogos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((favorite) => (
                <div
                  key={favorite._id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={favorite.cover || "/placeholder-game.jpg"}
                      alt={favorite.title}
                      className="w-full h-48 object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                      onClick={() => handleGameClick(favorite.gameId)}
                      onError={(e) => {
                        e.target.src = "/placeholder-game.jpg";
                      }}
                    />
                    <button
                      onClick={() =>
                        handleRemoveFavorite(favorite._id, favorite.title)
                      }
                      disabled={removingId === favorite._id}
                      className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
                      title="Remover dos favoritos"
                    >
                      {removingId === favorite._id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="p-4">
                    <h3
                      className="font-semibold text-lg mb-2 cursor-pointer hover:text-blue-400 transition-colors line-clamp-2"
                      onClick={() => handleGameClick(favorite.gameId)}
                    >
                      {favorite.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Adicionado em{" "}
                      {new Date(favorite.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {favorites.length > 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                {favorites.length}{" "}
                {favorites.length === 1
                  ? "jogo favoritado"
                  : "jogos favoritados"}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
