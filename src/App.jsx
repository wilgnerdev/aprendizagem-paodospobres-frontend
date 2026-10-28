import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

import Header from "./components/Header/Header";
import Home from "./pages/Home/Home.jsx";
import CursoDetalhes from "./pages/CursoDetalhes/CursoDetalhes.jsx";
import Footer from "./components/Footer/Footer";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));

      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      { <Header /> }

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cursos/:id" element={<CursoDetalhes />} />
      </Routes>

      { <Footer /> }
    </BrowserRouter>
  )
}

export default App;
