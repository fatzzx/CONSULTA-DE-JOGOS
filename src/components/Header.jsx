import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="w-full px-6 py-4 border-gray-800 bg-[#121212]">
      <div className="flex justify-between items-center">
        <div
          onClick={() => {
            navigate("/", { replace: true });
            window.location.reload();
          }}
          className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
          title="Voltar para a Home"
          aria-label="Logo Gameworth, clique para voltar para a Home"
        >
          <img src="/logoplay.png" alt="Gameworth Logo" className="h-10" />
        </div>

        <nav className="hidden md:flex space-x-6 text-lg">
          <span
            onClick={() => navigate("/trending")}
            className="cursor-pointer text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-sky-400 hover:to-blue-500 transition duration-300"
            >
            Trending
          </span>
        </nav>

        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={toggleMenu}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-3 text-lg">
          <span
            onClick={() => navigate("/trending")}
            className="text-gray-300 hover:text-sky-400 cursor-pointer"
          >
            Trending
          </span>
        </div>
      )}
    </header>
  );
}
