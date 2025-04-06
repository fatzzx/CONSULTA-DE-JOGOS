export default function GameCard({ title, details }) {
  return (
    <div className="glass-card p-6 rounded-xl shadow-xl hover:scale-[1.02] transform transition">
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sky-300 mb-2">{details}</p>
      <button className="mt-4 px-4 py-2 gradient-btn text-white font-medium rounded-lg hover:opacity-90 transition">
        Ver Detalhes
      </button>
    </div>
  );
}
