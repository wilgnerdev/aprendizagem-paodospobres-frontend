
import "./BackToTop.css";

function BackToTop() {
  return (
    <a
      href="#header"
      className="back-to-top"
      aria-label="Voltar ao topo"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </a>
  );
}

export default BackToTop;
