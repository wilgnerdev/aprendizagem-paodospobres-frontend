import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import "./Header.css"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 999px)");

    function handleResize(event) {
      setIsMobile(event.matches);

      if (!event.matches) {
        setMenuOpen(false);
      }
    }

    setIsMobile(mobileQuery.matches);
    mobileQuery.addEventListener("change", handleResize);

    return () => {
      mobileQuery.removeEventListener("change", handleResize);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleMenu() {
    setMenuOpen((open) => !open);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header id="header">
      <div className="nav-social">
        <nav aria-label="Redes sociais">
          <a
            href="https://www.facebook.com/paodospobres"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <i className="fa-brands fa-facebook-f" aria-hidden="true" />
          </a>

          <a
            href="https://www.linkedin.com/company/fundacao-pao-dos-pobres"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin-in" aria-hidden="true" />
          </a>

          <a
            href="https://www.youtube.com/channel/UCRcI7jAkBA8TSzFRFHqW1tQ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <i className="fa-brands fa-youtube" aria-hidden="true" />
          </a>

          <a
            href="https://www.instagram.com/fundacaopaodospobres"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram" aria-hidden="true" />
          </a>
        </nav>
      </div>

      <nav className="navbar" aria-label="Navegação principal">
        <Link className="logo" to="/" onClick={closeMenu}>
          <img
            src="/images/logo-pao-dos-pobres.png"
            alt="Logo Fundação O Pão dos Pobres"
          />
        </Link>

        <button
          className={`mobile-menu ${menuOpen ? "active" : ""}`}
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="nav-list"
          onClick={handleMenu}
        >
          <span className="line1" />
          <span className="line2" />
          <span className="line3" />
        </button>

        <ul
          id="nav-list"
          className={`nav-list ${menuOpen ? "active" : ""}`}
          inert={isMobile && !menuOpen}
        >
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/#cursos" onClick={closeMenu}>
              Cursos
            </Link>
          </li>

          <li>
            <Link to="/" onClick={closeMenu}>
              FAQ
            </Link>
          </li>

          <li>
            <Link
              className="btn list"
              to="/inscricao"
              onClick={closeMenu}
            >
              Inscrever-se
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
