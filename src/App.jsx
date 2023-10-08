import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import PhotoPage from "./pages/PhotoPage/PhotoPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GalleryPage />} />
        <Route path=":id" element={<PhotoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
