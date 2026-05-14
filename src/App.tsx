import { Routes, Route, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Pharmacy from "./pages/Pharmacy";
import TeaRoom from "./pages/TeaRoom";
import RecipeCard from "./pages/RecipeCard";
import NotFound from "./pages/NotFound";
import FloatingElements from "./components/FloatingElements";
import MusicControl from "./components/MusicControl";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/pharmacy" element={<Pharmacy />} />
        <Route path="/tea-room" element={<TeaRoom />} />
        <Route path="/recipe" element={<RecipeCard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <>
      <FloatingElements />
      <MusicControl />
      <AnimatedRoutes />
    </>
  );
}
