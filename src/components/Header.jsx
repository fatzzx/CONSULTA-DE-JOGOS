import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, User, Star, LogOut, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
const { isAuthenticated, logout, loading } = useAuth();
  if (loading) return null;

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setUserMenuOpen(false);
  };

  return (
    <header className="w-full px-6 py-4 border-gray-800 bg-[#121212] z-50 relative">
      <div className="flex justify-between items-center">
        <div
          onClick={() => {
            navigate("/", { replace: true });
            window.location.reload();
          }}
          className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
          title="Voltar para a Home"
        >
          <img src="/logoplay.png" alt="Gameworth Logo" className="h-10" />
        </div>

        <nav className="hidden md:flex space-x-6 text-lg items-center">
          <span
            onClick={() => navigate("/trending")}
            className="cursor-pointer text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-sky-400 hover:to-blue-500 transition duration-300"
          >
            Trending
          </span>

          {isAuthenticated && (
            <span
              onClick={() => navigate("/favorites")}
              className="cursor-pointer text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 transition duration-300 flex items-center gap-2"
            >
              <Star className="w-5 h-5" />
              Favoritos
            </span>
          )}

          {/* Menu do usuário */}
          <div className="relative">
            {isAuthenticated ? (
              <div>
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-lg transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">Perfil</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-700">
                    <button
                      onClick={() => handleNavigation("/favorites")}
                      className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <Star className="w-4 h-4" />
                      Meus Favoritos
                    </button>
                    <hr className="border-gray-700 my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors flex items-center gap-2 text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="text-sm">Entrar</span>
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors"
                >
                  <UserPlus className="w-5 h-5" />
                  <span className="text-sm">Cadastrar</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        <button
          className="md:hidden text-gray-300 focus:outline-none"
          onClick={toggleMenu}
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Fechar menu do usuário ao clicar fora */}
      {userMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setUserMenuOpen(false)}
        />
      )}

      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navigate={navigate}
        isAuthenticated={isAuthenticated}
        logout={handleLogout}
      />
    </header>
  );
}
