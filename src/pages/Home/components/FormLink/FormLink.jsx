import { Link } from 'react-router-dom'
import './FormLink.css'

function FormLink() {
    return (
        <section class="link-formulario">
            <div class="link-formulario-body">
                <h2 class="link-formulario-titulo">Pronto para transformar seu futuro?</h2>
                <p class="link-formulario-paragrafo">Inscreva-se no botão abaixo e dê o primeiro passo para uma carreira de sucesso.</p>
                <Link to="/inscricao" class="btn-link-formulario btn">Inscreva-se</Link>
            </div>
        </section>
    )
}

export default FormLink