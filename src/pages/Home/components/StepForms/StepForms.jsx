import './StepForms.css'

function StepForms() {
    return (
        <aside class="step-section">
        <div class="step-body">
            <h2 class="step-titulo">Como se inscrever</h2>
            <p class="step-paragraphy">Processo simples, sem burocracia</p>
            
        <div class="steps-grid">

            <div class="step-card">
                <div class="step-num">1</div>
                <div class="step-titulo-card">Escolha o curso</div>
                <div class="step-desc">Explore os cursos disponíveis e veja qual combina com seus objetivos e interesses. Faça a sua inscrição e aguarde o contato para participar do processo seletivo. 
                </div>
            </div>

            <div class="step-card">
                <div class="step-num">2</div>
                <div class="step-titulo-card">Processo seletivo</div>
                <div class="step-desc">Você irá ser contatado para participar da entrevista. Após isso iremos te chamar para agendar a entrega de documentos.</div>
            </div>

            <div class="step-card">
                <div class="step-num">3</div>
                <div class="step-titulo-card">Matricula</div>
                <div class="step-desc">Após a entrega dos documentos você está matriculado e apto para ser contrato por uma empresa parceira da Fundação.</div>
            </div>

            <div class="step-card">
                <div class="step-num">4</div>
                <div class="step-titulo-card">Começe sua jornada</div>
                <div class="step-desc">Após assinar o contrato começe sua jornada, participe das aulas e construa seu futuro profissional conosco.</div>
            </div>

        </div>

        </div>
        </aside>
    )
} 

export default StepForms