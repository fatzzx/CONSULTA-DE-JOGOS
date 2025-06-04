import { X, Star, LogOut, LogIn, UserPlus, User } from "lucide-react";

export default function MobileMenu({
  menuOpen,
  setMenuOpen,
  navigate,
  isAuthenticated,
  logout,
}) {
  const handleNavigation = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[rgba(10,10,10,0.85)] backdrop-blur-md z-40 flex flex-col items-center justify-center
        transition-all duration-300 ease-in-out
        ${
          menuOpen
            ? "h-screen opacity-100 pointer-events-auto"
            : "h-0 opacity-0 pointer-events-none"
        }`}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-white"
        aria-label="Close Menu"
      >
        <X size={36} />
      </button>

      <div className="flex flex-col items-center space-y-6">
        <span
          onClick={() => handleNavigation("/trending")}
          className={`text-2xl font-semibold text-white transform transition-transform duration-300 cursor-pointer flex items-center gap-3
            ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
        >
          Trending
        </span>

        {isAuthenticated ? (
          <>
            <span
              onClick={() => handleNavigation("/favorites")}
              className={`text-2xl font-semibold text-white transform transition-transform duration-300 cursor-pointer flex items-center gap-3
                ${
                  menuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
            >
              <Star className="w-6 h-6" />
              Favorites
            </span>

            <div className="flex flex-col items-center space-y-4 pt-4 border-t border-gray-600">
              <div className="flex items-center gap-3 text-gray-300">
                <User className="w-6 h-6" />
                <span className="text-lg">Profile</span>
              </div>

              <button
                onClick={handleLogout}
                className={`text-xl font-semibold text-red-400 transform transition-transform duration-300 cursor-pointer flex items-center gap-3
                  ${
                    menuOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
              >
                <LogOut className="w-6 h-6" />
                Logout
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <button
              onClick={() => handleNavigation("/login")}
              className={`text-2xl font-semibold text-white transform transition-transform duration-300 cursor-pointer flex items-center gap-3
                ${
                  menuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
            >
              <LogIn className="w-6 h-6" />
              Login
            </button>

            <button
              onClick={() => handleNavigation("/register")}
              className={`text-2xl font-semibold bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transform transition-transform duration-300 cursor-pointer flex items-center gap-3
                ${
                  menuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-5"
                }`}
            >
              <UserPlus className="w-6 h-6" />
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
