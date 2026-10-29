import { Link } from 'react-router-dom'
import './VoltarHome.css'

function VoltarHome() {
    return (
        <section className="voltar">
            <div className="voltar-body">
                <h3 className="voltar-titulo">Quer explorar mais cursos?</h3>
                <Link to="/#cursos" className="btn voltar">
                    Volte ao início
                </Link>
            </div>
        </section>
    )
}

export default VoltarHome