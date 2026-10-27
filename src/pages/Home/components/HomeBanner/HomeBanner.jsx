import { Link } from "react-router-dom"
import "./HomeBanner.css"

function HomeBanner() {
  return (
    <section className="banner-destaque">
      <div className="texto-banner-destaque">
        <h1 className="banner-title">
          Aprendizagem Profissional e Cursos de Qualificação
        </h1>

        <Link className="btn" to="/inscricao">
          Inscreva-se gratuitamente
        </Link>
      </div>
    </section>
  )
}

export default HomeBanner
