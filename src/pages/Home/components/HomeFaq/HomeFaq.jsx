import FaqAccordion from "../../../../components/Faq/FaqAccordion"
import faqHomeData from "../../../../data/faqHomeData"
import "./HomeFaq.css"

function HomeFaq() {
    return (
        <section className="faq-container faq-home">
            <div className="faq-banner-home">
                <div className="container faq-home-banner-content">
                    <h1 className="titulo-faq-home">
                        Como podemos ajudar?
                    </h1>

                    <p className="paragrafo-faq-home">
                        Tire suas dúvidas sobre inscrições, cursos e certificações.
                    </p>
                </div>
            </div>

            <div className="container faq-home-content">
                <h2 className="faq-home-titulo">
                    Perguntas Frequentes
                </h2>

                {faqHomeData.map((item) => (
                    <FaqAccordion
                        key={item.id}
                        pergunta={item.pergunta}
                        resposta={item.resposta}
                    />
                ))}

                <a className="btn faq-home-link" href="/faq">
                    Ver mais perguntas
                </a>
            </div>
        </section>
    )
}

export default HomeFaq