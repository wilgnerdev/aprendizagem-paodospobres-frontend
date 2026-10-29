
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getCursoPorId, notaPcD } from "../../data/cursos"
import VoltarHome from "../../components/VoltarHome/VoltarHome"
import "./CursoDetalhes.css"

function CursoDetalhes() {
  const { id } = useParams();
  const curso = getCursoPorId(id);

  if (!curso) {
    return (
      <main className="curso-detalhes-main">
        <div
          className="secao-curso"
          style={{ gridColumn: "1 / -1", textAlign: "center" }}
        >
          <h2 className="secao-titulo">Curso não encontrado</h2>

          <p className="secao-texto" style={{ maxWidth: "100%", marginBottom: "30px" }}>
            O link acessado não corresponde a nenhum curso disponível.
          </p>

          <Link to="/" className="btn">
            Voltar para a página inicial
          </Link>
        </div>
      </main>
    );
  }

  const { fichaTecnica, turnos, habilidades } = curso;

  const textoTurnos = turnos
    .map((turno) =>
      turno.observacao
        ? `${turno.turno} (${turno.observacao})`
        : turno.turno
    )
    .join(" · ");

  return (
    <>
      <section
        className="curso-banner"
        id="curso-banner"
        style={{
          "--curso-imagem-banner": curso.imagemBanner
            ? `url("/images/cursos/${curso.imagemBanner}")`
            : "none",
        }}
      >
        <div className="texto-banner">
          <h1 id="curso-titulo">{curso.titulo}</h1>
          <p id="curso-resumo">{curso.resumoBanner}</p>
        </div>
      </section>

      <main className="curso-detalhes-main">
        <section className="curso-principal">
          <div className="secao-curso">
            <h2 className="secao-titulo">Sobre o curso</h2>
            <p className="secao-texto">{curso.sobre}</p>
          </div>

          <div className="secao-curso">
            <h2 className="secao-titulo">
              O que você vai aprender?
            </h2>

            <div className="skills-list">
              {!habilidades || habilidades.length === 0 ? (
                <p className="secao-texto">
                  Conteúdo programático em atualização.
                </p>
              ) : (
                habilidades.map((habilidade, indice) => (
                  <LinhaHabilidade
                    key={`${habilidade.titulo}-${indice}`}
                    habilidade={habilidade}
                    indice={indice}
                  />
                ))
              )}
            </div>
          </div>
        </section>

        <aside className="sidebar-card">
          <div className="sidebar-topo">
            <div className="badge-hole"></div>
            <p className="sidebar-info">Ficha do curso</p>
            <p className="sidebar-titulo">{curso.titulo}</p>
          </div>

          <div className="sidebar-body">
            <div className="info-row">
              <div>
                <p className="info-label">Carga horária</p>
                <p className="info-value">
                  {fichaTecnica.cargaHoraria}
                </p>
              </div>
            </div>

            <div className="info-row">
              <div>
                <p className="info-label">Modalidade</p>
                <p className="info-value">
                  {fichaTecnica.modalidade}
                </p>
              </div>
            </div>

            <div className="info-row">
              <div>
                <p className="info-label">Idade</p>
                <p className="info-value">{fichaTecnica.idade}</p>
              </div>
            </div>

            <div className="info-row">
              <div>
                <p className="info-label">Escolaridade mínima</p>
                <p className="info-value">
                  {fichaTecnica.escolaridadeMinima}
                </p>
              </div>
            </div>

            <div className="info-row">
              <div>
                <p className="info-label">Turnos</p>
                <p className="info-value">{textoTurnos}</p>
              </div>
            </div>

            <p className="info-nota">*{notaPcD}</p>

            <Link to="/inscricao" className="btn sidebar">
              Inscreva-se agora
            </Link>

            <p className="cta-sub">
              Vagas limitadas · Formação gratuita
            </p>
          </div>
        </aside>
      </main>
      <VoltarHome />
    </>
  )
}

function LinhaHabilidade({ habilidade, indice }) {
  const [aberto, setAberto] = useState(false);

  const temTopicos =
    Array.isArray(habilidade.topicos) &&
    habilidade.topicos.length > 0;

  const painelId = `skill-painel-${indice}`;

  return (
    <div className={`skill-row ${aberto ? "aberto" : ""}`}>
      {temTopicos ? (
        <>
          <button
            type="button"
            className="skill-cabecalho"
            aria-expanded={aberto}
            aria-controls={painelId}
            onClick={() => setAberto((estadoAtual) => !estadoAtual)}
          >
            <p className="skill-titulo">{habilidade.titulo}</p>

            <i
              className="ti ti-chevron-down skill-seta"
              aria-hidden="true"
            />
          </button>

          <div className="skill-painel" id={painelId}>
            <div className="skill-painel-interno">
              <ul className="skill-topicos">
                {habilidade.topicos.map((topico, index) => (
                  <li key={`${topico}-${index}`}>{topico}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="skill-cabecalho">
            <p className="skill-titulo">{habilidade.titulo}</p>
          </div>

          {habilidade.descricao && (
            <p className="skill-sub">{habilidade.descricao}</p>
          )}
        </>
      )}
    </div>
  )
}

export default CursoDetalhes
