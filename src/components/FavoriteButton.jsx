import { useState, useEffect } from "react";
import { Heart, HeartIcon } from "lucide-react";
import { favoritesAPI } from "../utils/api";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function FavoriteButton({
  game,
  size = "default",
  className = "",
  showText = false,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-5 h-5",
    large: "w-6 h-6",
  };

  const buttonSizes = {
    small: "p-1.5",
    default: "p-2",
    large: "p-3",
  };

  useEffect(() => {
    if (isAuthenticated && game) {
      checkIfFavorite();
    }
  }, [isAuthenticated, game]);

  const checkIfFavorite = async () => {
    try {
      const data = await favoritesAPI.getFavorites();
      cconst userFavorites = data || [];
      setFavorites(userFavorites);

      const isFav = userFavorites.some(
        (fav) => fav.gameId === game.id.toString()
      );
      setIsFavorite(isFav);
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  const handleFavoriteClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!game) return;

    setLoading(true);

    try {
      if (isFavorite) {
        // Remover dos favoritos
        const favoriteToRemove = favorites.find(
          (fav) => fav.gameId === game.id.toString()
        );
        if (favoriteToRemove) {
          await favoritesAPI.removeFavorite(favoriteToRemove._id);
          setIsFavorite(false);
          setFavorites((prev) =>
            prev.filter((fav) => fav._id !== favoriteToRemove._id)
          );
        }
      } else {
        // Adicionar aos favoritos
        const gameData = {
          gameId: game.id.toString(),
          title: game.title || game.name,
          cover: game.image || game.background_image || "",
        };

        const newFavorite = await favoritesAPI.addFavorite(gameData);
        setIsFavorite(true);
        setFavorites((prev) => [...prev, newFavorite.favorite]);
      }
    } catch (error) {
      console.error("Error managing favorite:", error);
      // Aqui você pode adicionar uma notificação de erro
    } finally {
      setLoading(false);
    }
  };

  const IconComponent = isFavorite ? HeartIcon : Heart;

  return (
    <button
      onClick={handleFavoriteClick}
      disabled={loading}
      className={`
        ${buttonSizes[size]}
        ${
          isFavorite
            ? "bg-red-600 hover:bg-red-700 text-white"
            : "bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
        }
        rounded-full transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed
        flex items-center gap-2
        ${className}
      `}
      title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      {loading ? (
        <div
          className={`${sizeClasses[size]} border-2 border-current border-t-transparent rounded-full animate-spin`}
        />
      ) : (
        <IconComponent
          className={`${sizeClasses[size]} ${isFavorite ? "fill-current" : ""}`}
        />
      )}

      {showText && (
        <span className="text-sm font-medium">
          {isFavorite ? "Favoritado" : "Favoritar"}
        </span>
      )}
    </button>
  );
}
