export default function SearchSection() {
  return (
    <section className="text-center py-20 px-6">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        Descubra se o jogo vale a pena
      </h2>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
        Compare tempo de campanha, preço e popularidade para tomar decisões
        inteligentes antes de jogar.
      </p>
      <div className="relative w-full max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Busque um jogo..."
          className="w-full p-4 pl-12 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
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
    </section>
  );
}
