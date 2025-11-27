import { Header } from "@components/index.ts";
import { Collections, Home, MatchYourVibe, NotFound } from "@pages/index.ts";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen bg-off-white text-black-rich">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/match-your-vibe" element={<MatchYourVibe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// Top-level component to wrap everything in the BrowserRouter
const App: React.FC = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
