export default function Header() {
  return (
    <header className="flex justify-between items-center p-6 border-b border-gray-800">
      <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
        PlayWorth
      </h1>

      <nav className="space-x-6 text-lg">
        <a href="#" className="text-gray-300 hover:text-sky-400">
          Home
        </a>
        <a href="#" className="text-gray-300 hover:text-sky-400">
          Compare
        </a>
        <a href="#" className="text-gray-300 hover:text-sky-400">
          Alerts
        </a>
      </nav>
    </header>
  );
}
