import './HomeAbout.css'

function HomeAbout() {
    return (
        <>
            <section className="sobre">
                <div className="card-sobre">
                    <h2 className="sobre-titulo">
                        Sobre a Fundação
                    </h2>

                    <p className="texto-sobre">
                        Há mais de 130 anos, a Fundação O Pão dos
                        Pobres atua na educação e na assistência
                        social em Porto Alegre, oferecendo formação
                        profissional gratuita para jovens e adultos.
                    </p>
                </div>

                <div className="box-card-destaque">
                    <span className="card-destaque">
                        <span>130+</span>
                        <span>Anos de História</span>
                    </span>

                    <span className="card-destaque">
                        <span>Cursos Profissionalizantes</span>
                        <span>Gratuitos</span>
                    </span>
                </div>
            </section>

            <section className="info-section">
                <div className="info-grid">
                    <div className="info-card">
                        <h2 className="info-card-titulo">
                            Objetivo
                        </h2>

                        <p>
                            Proporcionar a formação integral de
                            adolescentes e jovens, visando sua
                            inserção no mundo do trabalho, como
                            cidadãos éticos e profissionais competentes.
                        </p>
                    </div>

                    <div className="info-card">
                        <h2 className="info-card-titulo">
                            Público-alvo
                        </h2>

                        <p>
                            Adolescentes e jovens entre 14 e 24 anos
                            (sem limite de idade para pessoas com
                            deficiência), de famílias em situação de
                            vulnerabilidade ou risco social.
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HomeAbout
