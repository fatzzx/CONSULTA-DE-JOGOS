import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="w-full flex justify-between items-center px-6 py-4 border-b border-gray-800">
   
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 cursor-pointer transition-transform duration-200 hover:scale-105"
      >
        <img src="/logoplay.png" alt="PlayWorth Logo" className="h-15" />
        <span className="text-white font-bold text-xl"></span>
      </div>

     
      <nav className="space-x-6 text-lg">
        <a href="/" className="text-gray-300 hover:text-sky-400">Home</a>
        <a href="/compare" className="text-gray-300 hover:text-sky-400">Compare</a>
        <a href="/alerts" className="text-gray-300 hover:text-sky-400">Alerts</a>
        <a href="/trending" className="text-gray-300 hover:text-sky-400">Trending</a>
      </nav>
    </header>
  );
}
