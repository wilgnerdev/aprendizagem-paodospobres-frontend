import { useState } from "react"

function FaqAccordion({ pergunta, resposta }) {
    const [aberto, setAberto] = useState(false);

    return (
        <div className={`faq-item ${aberto ? "active" : ""}`}>
            <button
                type="button"
                className="faq-question"
                onClick={() => setAberto((estado) => !estado)}
                aria-expanded={aberto}
            >
                <h3 className="faq-question-titulo">
                    {pergunta}
                </h3>

                <svg
                    className="svg-faq"
                    viewBox="0 0 42 25"
                    aria-hidden="true"
                >
                    <path
                        d="M3 3L21 21L39 3"
                        stroke="currentColor"
                        strokeWidth="7"
                        strokeLinecap="round"
                        fill="none"
                    />
                </svg>
            </button>

            <div className="faq-answer">
                <p className="faq-answer-paragrafo">
                    {resposta}
                </p>
            </div>
        </div>
    )
}

export default FaqAccordion