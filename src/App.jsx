import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import Trending from "./pages/Trending"; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jogo/:id" element={<GameDetails />} />
        <Route path="/trending" element={<Trending />} /> 
      </Routes>
    </Router>
  );
}
