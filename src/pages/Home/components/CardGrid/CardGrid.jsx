import { Link } from "react-router-dom"
import "./CardGrid.css"
import { cursos } from "../../../../data/cursos"

function CardGrid() {
    return (
        <section id="cursos" className="curso-section">
            <h2 className="curso-titulo">
                Cursos disponíveis
            </h2>

            <p className="curso-paragrafo">
                Escolha uma área e conheça os detalhes de cada curso.
            </p>

            <div className="cursos-grid">
                {cursos.map((curso) => (
                    <div className="card-curso" key={curso.id}>
                        <div className="top-card">
                            <img
                                src={`/images/cursos/${curso.imagemCard}`}
                                loading="lazy"
                                alt={`Foto do curso de ${curso.titulo}`}
                            />

                            <span className="card-badge">
                                Aprendizagem
                            </span>
                        </div>

                        <div className="card-conteudo">
                            <h3 className="titulo-card-conteudo">
                                {curso.titulo}
                            </h3>

                            <p className="paragrafo-card-conteudo">
                                {curso.resumoBanner}
                            </p>

                            <Link
                                to={`/cursos/${curso.id}`}
                                className="ver-detalhes"
                            >
                                Ver Detalhes

                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    aria-hidden="true"
                                >
                                    <path d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CardGrid
