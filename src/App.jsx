import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import Trending from "./pages/Trending";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jogo/:id" element={<GameDetails />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
