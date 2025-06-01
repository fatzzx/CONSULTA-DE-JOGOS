import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

export default function GameCard({ title, genres, rating, image, id }) {
  const navigate = useNavigate();

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return "text-green-400";
    if (rating >= 4.0) return "text-yellow-400";
    if (rating >= 3.5) return "text-orange-400";
    return "text-red-400";
  };

  // Formatação do jogo para o FavoriteButton
  const gameData = {
    id,
    title,
    image,
  };

  return (
    <div
      className="bg-[#1b2339] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 hover:-translate-y-1 group w-72 flex flex-col cursor-pointer relative"
      onClick={() => navigate(`/jogo/${id}`)}
    >
      {image && (
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-40 object-cover group-hover:brightness-110 transition"
          />
          {/* Botão de favorito */}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <FavoriteButton
              game={gameData}
              size="small"
              className="shadow-lg"
            />
          </div>
        </div>
      )}
      <div className="p-4 flex flex-col flex-grow bg-[#1b1b1b]">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
        <div className="text-gray-400 mt-2 mb-4 flex-grow space-y-1">
          <p className="whitespace-pre-line">{genres}</p>
          <p className={`${getRatingColor(rating)}`}>⭐{rating}/5</p>
        </div>
      </div>
    </div>
  );
}
