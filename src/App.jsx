import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import PhotoPage from "./pages/PhotoPage/PhotoPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path=":id" element={<PhotoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
