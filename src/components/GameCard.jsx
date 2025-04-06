export default function GameCard({ title, genres, rating, image, id }) {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg w-72 flex flex-col">
      {image && (
        <img src={image} alt={title} className="w-full h-40 object-cover" />
      )}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
        <div className="text-gray-400 text-sm mt-2 mb-4 flex-grow">
          <div className="mb-1">🎮 {genres}</div>
          <div>⭐ {rating}/5</div>
        </div>
        <button
          className="mt-auto bg-sky-600 hover:bg-sky-700 text-white py-2 px-4 rounded-md transition-colors"
          onClick={() => alert(`Detalhes do jogo ID: ${id} (em breve)`)}
        >
          Ver detalhes
        </button>
      </div>
    </div>
  );
}
