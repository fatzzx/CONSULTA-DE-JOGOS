import { useNavigate } from "react-router-dom";

export default function GameCard({ title, genres, rating, image, id }) {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg w-72 flex flex-col">
      {image && (
        <img src={image} alt={title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white text-xl font-semibold">{title}</h3>

        <div className="text-gray-400 mt-2 mb-4 flex-grow space-y-1">
          <p className="whitespace-pre-line">🎮 {genres}</p>
          <p>⭐ {rating}/5</p>
        </div>

        <button
          className="mt-auto bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-md transition-colors"
          onClick={() => navigate(`/jogo/${id}`)}
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
}
