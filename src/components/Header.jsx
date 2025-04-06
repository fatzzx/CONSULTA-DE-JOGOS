export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 border-b border-gray-800">
      <h1 className="text-3xl font-extrabold accent-text tracking-wide">
        PlayWorth
      </h1>
      <nav className="space-x-6 text-lg">
        <a href="#" className="text-gray-300 hover:text-sky-400">
          Início
        </a>
        <a href="#" className="text-gray-300 hover:text-sky-400">
          Comparar
        </a>
        <a href="#" className="text-gray-300 hover:text-sky-400">
          Alertas
        </a>
      </nav>
    </header>
  );
}
