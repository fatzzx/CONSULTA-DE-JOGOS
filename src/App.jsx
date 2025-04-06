import Header from "./components/Header";
import SearchSection from "./components/SearchSection";
import GameList from "./components/GameList";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <SearchSection />
      <GameList />
      <Footer />
    </div>
  );
}
