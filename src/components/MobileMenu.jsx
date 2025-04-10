import { X } from "lucide-react";

export default function MobileMenu({ menuOpen, setMenuOpen, navigate }) {
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
        aria-label="Fechar Menu"
      >
        <X size={36} />
      </button>

      <span
        onClick={() => {
          setMenuOpen(false);
          navigate("/trending");
        }}
        className={`text-2xl font-semibold text-white my-4 transform transition-transform duration-300 cursor-pointer
          ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
      >
        Trending
      </span>
    </div>
  );
}
