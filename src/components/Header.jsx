import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="w-full px-6 py-4  border-gray-800 bg-[#121212]">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <img src="/logoplay.png" alt="PlayWorth Logo" className="h-10" />
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 text-lg">
          <a href="/" className="text-gray-300 hover:text-sky-400">Home</a>
          <a href="/compare" className="text-gray-300 hover:text-sky-400">Compare</a>
          <a href="/alerts" className="text-gray-300 hover:text-sky-400">Alerts</a>
          <a href="/trending" className="text-gray-300 hover:text-sky-400">Trending</a>
        </nav>

        {/* Mobile menu icon */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 text-lg">
          <a href="/" className="text-gray-300 hover:text-sky-400">Home</a>
          <a href="/compare" className="text-gray-300 hover:text-sky-400">Compare</a>
          <a href="/alerts" className="text-gray-300 hover:text-sky-400">Alerts</a>
          <a href="/trending" className="text-gray-300 hover:text-sky-400">Trending</a>
        </div>
      )}
    </header>
  );
}
