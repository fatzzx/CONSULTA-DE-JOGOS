import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="w-full px-6 py-4 border-gray-800 bg-[#121212]">
      <div className="flex justify-between items-center">
        {/* ✅ USANDO LINK PARA VOLTAR AO HOME */}
        <Link
          to="/"
          className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
        >
          <img src="/logoplay.png" alt="PlayWorth Logo" className="h-10" />
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden md:flex space-x-6 text-lg">
          <Link to="/trending" className="text-gray-300 hover:text-sky-400">
            Trending
          </Link>
        </nav>

        {/* Menu mobile */}
        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Navegação mobile */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 text-lg">
          <Link to="/" className="text-gray-300 hover:text-sky-400">
            Home
          </Link>
          <Link to="/trending" className="text-gray-300 hover:text-sky-400">
            Trending
          </Link>
        </div>
      )}
    </header>
  );
}
