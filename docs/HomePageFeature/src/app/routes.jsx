import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Scores from "../pages/Score";
import Teams from "../pages/team";
import Players from "../pages/Players";
import News from "../pages/news";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/scores" element={<Scores />} />

      <Route path="/teams" element={<Teams />} />

      <Route path="/players" element={<Players />} />

      <Route path="/news" element={<News />} />
    </Routes>
  );
}
