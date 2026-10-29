import './FaqPage.css'
import faqPageData from '../../data/faqPageData'
import FaqAccordion from '../../components/Faq/FaqAccordion'

function FaqPage() {
    return (
        <section className="faq-container">
                <div className="faq-banner">
                    <div className="container">
                        <h1 className="titulo-faq">
                            Como podemos ajudar?
                        </h1>

                        <p className="paragrafo-faq">
                            Tire suas dúvidas sobre inscrições, cursos e certificações.
                        </p>
                    </div>
                </div>

                {faqPageData.map((categoria) => (
                    <div
                        className="container faq-categoria"
                        key={categoria.id}
                    >
                        <h2 className="faq-corpo-titulo">
                            {categoria.categoria}
                        </h2>

                        {categoria.perguntas.map((item) => (
                            <FaqAccordion
                                key={`${categoria.id}-${item.id}`}
                                pergunta={item.pergunta}
                                resposta={item.resposta}
                            />
                        ))}
                    </div>
                ))}

                <div className="faq-cta">
                    <h2 className="faq-cta-titulo">
                        Ainda tem dúvidas?
                    </h2>

                    <p className="faq-cta-paragrafo">
                        Entre em contato com a nossa equipe.
                        Estamos prontos para te ajudar com o que precisar.
                    </p>

                    <a
                        className="btn faq"
                        href="https://wa.me/5551990074346"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Fale com a Fundação
                    </a>
                </div>
            </section>
    )
}

export default FaqPage