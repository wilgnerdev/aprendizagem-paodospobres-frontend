import "../../components/Modal/Modal.css"
import { useState } from "react"
import { buscarCep } from "../../services/viacep"
import { calcularIdade, validarCandidato } from "../../utils/formulario-validacoes"
import './Form.css'
import VoltarHome from '../../components/VoltarHome/VoltarHome'

const cursos = [
  ["assistente-administrativo", "Assistente Administrativo"],
  ["cabeleireiro", "Assistente de Cabeleireiro"],
  ["desenvolvimento-web", "Desenvolvimento Web"],
  ["corte-costura-modelagem", "Corte, Costura e Modelagem Sustentável"],
  ["desporto", "Desporto"],
  ["eletromecanica-elevadores", "Eletromecânica de Elevadores"],
  ["gastronomia", "Gastronomia"],
  ["mecanica-automotiva", "Mecânica Automotiva"],
  ["projetista-moveis", "Projetista de Móveis"],
  ["refrigeracao-climatizacao", "Refrigeração e Climatização"],
  ["suporte-ti", "Suporte em T.I"],
  ["vendas-atendimento", "Vendas e Atendimento ao Cliente"],
];

const escolaridadesQueEstudam = [
  "fund-7", "fund-8", "fund-9",
  "medio-1", "medio-2", "medio-3",
];

const hoje = new Date();
const dataMaxima = [
  hoje.getFullYear(),
  String(hoje.getMonth() + 1).padStart(2, "0"),
  String(hoje.getDate()).padStart(2, "0"),
].join("-");

const valoresIniciais = {
  curso: "",
  periodo: "",
  nome: "",
  email: "",
  cpf: "",
  telefone: "",
  telefoneSecundario: "",
  dataNascimento: "",
  genero: "",
  cep: "",
  logradouro: "",
  numero: "",
  bairro: "",
  cidade: "",
  uf: "",
  onibus: "",
  escolaridade: "",
  frequenciaEscolar: "",
  turnoEscola: "",
  pessoasCasa: "",
  rendaFamiliar: "",
  acolhimento: "",
  acolhimentoQual: "",
  deficiencia: "",
  deficienciaQual: "",
  jaFezCurso: "",
  expectativa: "",
  historiaVida: "",
  porqueEscolher: "",
  consentimentoLgpd: false,
};

function formatarTelefone(valor) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);

  if (digitos.length <= 2) {
    return digitos ? `(${digitos}` : "";
  }

  const ddd = digitos.slice(0, 2);
  const numero = digitos.slice(2);

  if (digitos.length <= 10) {
    return `(${ddd}) ${numero.slice(0, 4)}${
      numero.length > 4 ? `-${numero.slice(4)}` : ""
    }`;
  }

  return `(${ddd}) ${numero.slice(0, 5)}${
    numero.length > 5 ? `-${numero.slice(5)}` : ""
  }`;
}

function formatarCpf(valor) {
  const digitos = valor.replace(/\D/g, "").slice(0, 11);

  if (digitos.length <= 3) {
    return digitos;
  }

  if (digitos.length <= 6) {
    return `${digitos.slice(0, 3)}.${digitos.slice(3)}`;
  }

  if (digitos.length <= 9) {
    return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6)}`;
  }

  return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9)}`;
}

export default function Form() {
  const [form, setForm] = useState(valoresIniciais);
  const [erros, setErros] = useState({});
  const [erroCep, setErroCep] = useState("");
  const [consultandoCep, setConsultandoCep] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const idade = form.dataNascimento
    ? calcularIdade(form.dataNascimento)
    : "";

  const estuda = escolaridadesQueEstudam.includes(
    form.escolaridade
  );

  function atualizarCampo(evento) {
    const { name, value, type, checked } = evento.target;
    const valorAtualizado =
      name === "cpf"
        ? formatarCpf(value)
        : name === "telefone" || name === "telefoneSecundario"
        ? formatarTelefone(value)
        : type === "checkbox"
          ? checked
          : value;

    setForm((atual) => {
      const novo = {
        ...atual,
        [name]: valorAtualizado,
      };

      // Limpa dados de campos condicionais quando deixam de ser aplicáveis.
      if (name === "acolhimento" && value !== "sim") {
        novo.acolhimentoQual = "";
      }

      if (name === "deficiencia" && value !== "sim") {
        novo.deficienciaQual = "";
      }

      if (name === "escolaridade" &&
          !escolaridadesQueEstudam.includes(value)) {
        novo.frequenciaEscolar = "";
      }

      return novo;
    });

    setErros((atuais) => ({
      ...atuais,
      [name]: "",
    }));
  }

  function mostrarErro(campo, mensagem) {
    setErros((atuais) => ({
      ...atuais,
      [campo]: mensagem,
    }));

    // Espera a atualização do React antes de localizar o elemento.
    requestAnimationFrame(() => {
      const elemento = document.getElementById(`erro-${campo}`);

      elemento?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    });
  }

  async function consultarCep() {
    if (!form.cep.trim()) return;

    setErroCep("");
    setConsultandoCep(true);

    try {
      const endereco = await buscarCep(form.cep);

      setForm((atual) => ({
        ...atual,
        logradouro: endereco.logradouro || "",
        bairro: endereco.bairro || "",
        cidade: endereco.localidade || "",
        uf: endereco.uf || "",
      }));
    } catch (erro) {
      setErroCep(erro.message);

      setForm((atual) => ({
        ...atual,
        logradouro: "",
        bairro: "",
        cidade: "",
        uf: "",
      }));
    } finally {
      setConsultandoCep(false);
    }
  }

  function campoErro(nome) {
    return erros[nome] ? (
      <div
        id={`erro-${nome}`}
        className="mensagem-validacao"
        role="alert"
      >
        {erros[nome]}
      </div>
    ) : (
      <div
        id={`erro-${nome}`}
        className="mensagem-validacao"
      />
    );
  }

  async function enviarFormulario(evento) {
    evento.preventDefault();
    setErros({});

    const frequenciaTexto = form.frequenciaEscolar.trim();
    const frequencia = frequenciaTexto === ""
      ? null
      : Number(frequenciaTexto);

    const resultado = validarCandidato({
      cursoId: form.curso,
      idade: form.dataNascimento
        ? calcularIdade(form.dataNascimento)
        : NaN,
      escolaridade: form.escolaridade,
      pcd: form.deficiencia === "sim",
      frequencia,
    });

    if (!resultado.valido) {
      const camposPorMotivo = {
        "idade-minima": "dataNascimento",
        "idade-maxima": "dataNascimento",
        "data-nascimento": "dataNascimento",
        escolaridade: "escolaridade",
        "escolaridade-invalida": "escolaridade",
        frequencia: "frequenciaEscolar",
        curso: "curso",
      };

      const campo = camposPorMotivo[resultado.motivo];

      if (campo) {
        const nomesDosErros = {
          dataNascimento: "data-nascimento",
          frequenciaEscolar: "frequencia-escolar",
          escolaridade: "escolaridade",
          curso: "select-cursos",
        };

        mostrarErro(nomesDosErros[campo], resultado.mensagem);
      }

      return;
    }

    // A validação acima não envia dados para um servidor.
    // O envio real será integrado à API/backend do projeto.
    setEnviando(true);

    try {
      setForm(valoresIniciais);
      setErros({});
      setErroCep("");
      setModalAberto(true);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
    <section className="formulario" id="inscreva-se">
      <form
        id="formCadastro"
        className="corpo-formulario"
        onSubmit={enviarFormulario}
      >
        <h2 className="titulo__form">Faça sua inscrição</h2>

        <p className="form__paragrafo">
          Preencha os campos abaixo para se inscrever em nossos cursos
        </p>

        <fieldset className="fieldset__formulario">
          <legend>Curso de Interesse</legend>

          <div className="linha">
            <div className="campo-largo">
              <label htmlFor="select-cursos">Selecione um curso</label>

              <select
                id="select-cursos"
                name="curso"
                value={form.curso}
                onChange={atualizarCampo}
                required
              >
                <option value="">Selecione um curso</option>
                {cursos.map(([id, titulo]) => (
                  <option key={id} value={id}>{titulo}</option>
                ))}
              </select>

              {campoErro("select-cursos")}
            </div>

            <div className="campo-curto periodo">
              <label htmlFor="select-periodo">Período de Preferência</label>
              <select
                id="select-periodo"
                name="periodo"
                value={form.periodo}
                onChange={atualizarCampo}
                required
              >
                <option value="">Selecione</option>
                <option value="manha">Manhã</option>
                <option value="tarde">Tarde</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="fieldset__formulario">
          <legend>Dados Pessoais</legend>

          <label htmlFor="nome">Nome Completo</label>
          <input
            id="nome"
            name="nome"
            value={form.nome}
            onChange={atualizarCampo}
            autoComplete="name"
            placeholder="Digite seu nome completo"
            required
          />

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={atualizarCampo}
            autoComplete="email"
            placeholder="seu@email.com"
            required
          />

          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            name="cpf"
            value={form.cpf}
            onChange={atualizarCampo}
            inputMode="numeric"
            placeholder="000.000.000-00"
            maxLength={14}
            required
          />

          <div className="linha">
            <div className="campo-largo">
              <label htmlFor="telefone">Telefone (com WhatsApp)</label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                value={form.telefone}
                onChange={atualizarCampo}
                autoComplete="tel"
                placeholder="(51) 99999-9999"
                inputMode="numeric"
                maxLength={15}
                required
              />
            </div>

            <div className="campo-largo">
              <label htmlFor="telefone-secundario">
                Telefone Secundário <span className="opcional">(opcional)</span>
              </label>
              <input
                id="telefone-secundario"
                name="telefoneSecundario"
                type="tel"
                value={form.telefoneSecundario}
                onChange={atualizarCampo}
                placeholder="(51) 99999-9999"
                inputMode="numeric"
                maxLength={15}
              />
            </div>
          </div>

          <div className="linha idade">
            <div className="campo-largo idade">
              <label htmlFor="data-nascimento">Data de Nascimento</label>
              <input
                id="data-nascimento"
                name="dataNascimento"
                type="date"
                value={form.dataNascimento}
                onChange={atualizarCampo}
                max={dataMaxima}
                autoComplete="bday"
                required
              />
              {campoErro("data-nascimento")}
            </div>

            <div className="campo-curto idade">
              <label htmlFor="idade-calculada">Idade</label>
              <input
                id="idade-calculada"
                name="idadeCalculada"
                value={idade}
                readOnly
                placeholder="--"
                aria-describedby="idade-hint"
              />
              <p id="idade-hint" className="campo-ajuda idade">
                Calculada automaticamente
              </p>
            </div>
          </div>

          <label htmlFor="genero">Gênero / Como você se identifica</label>
          <select
            className="genero"
            id="genero"
            name="genero"
            value={form.genero}
            onChange={atualizarCampo}
            required
          >
            <option value="">Selecione</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="nao-binario">Não-binário</option>
            <option value="prefiro-nao-informar">Prefiro não informar</option>
            <option value="outro">Outro</option>
          </select>
        </fieldset>

        <fieldset className="fieldset__formulario">
          <legend>Endereço</legend>

          <label htmlFor="cep">CEP</label>
          <input
            id="cep"
            name="cep"
            value={form.cep}
            onChange={atualizarCampo}
            onBlur={consultarCep}
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="00000-000"
            maxLength={9}
            required
          />

          {erroCep && (
            <div className="mensagem-validacao" role="alert">
              {erroCep}
            </div>
          )}

          {consultandoCep && (
            <p className="campo-ajuda">Consultando CEP...</p>
          )}

          <div className="linha">
            <div className="campo-largo">
              <label htmlFor="logradouro">Rua</label>
              <input
                id="logradouro"
                name="logradouro"
                value={form.logradouro}
                readOnly
              />
            </div>

            <div className="campo-curto">
              <label htmlFor="numero">Número</label>
              <input
                id="numero"
                name="numero"
                value={form.numero}
                onChange={atualizarCampo}
                inputMode="numeric"
                required
              />
            </div>
          </div>

          <label htmlFor="bairro">Bairro</label>
          <input id="bairro" name="bairro" value={form.bairro} readOnly />

          <div className="linha">
            <div className="campo-largo">
              <label htmlFor="cidade">Cidade</label>
              <input id="cidade" name="cidade" value={form.cidade} readOnly />
            </div>

            <div className="campo-curto">
              <label htmlFor="uf">UF</label>
              <input id="uf" name="uf" value={form.uf} maxLength={2} readOnly />
            </div>
          </div>

          <label htmlFor="onibus">
            Qual ônibus você utiliza para chegar até a Fundação?
          </label>
          <p className="campo-ajuda">
            Local de curso: Rua República, 801 - Cidade Baixa, Porto Alegre
          </p>
          <input
            id="onibus"
            name="onibus"
            value={form.onibus}
            onChange={atualizarCampo}
            placeholder="Ex: 265, T4, a pé..."
            required
          />
        </fieldset>

        <fieldset className="fieldset__formulario">
          <legend>Situação Escolar</legend>

          <label htmlFor="escolaridade">Escolaridade</label>
          <select
            id="escolaridade"
            name="escolaridade"
            value={form.escolaridade}
            onChange={atualizarCampo}
            required
          >
            <option value="">Selecione</option>
            <option value="fund-7">7° ano Ensino Fundamental</option>
            <option value="fund-8">8° ano Ensino Fundamental</option>
            <option value="fund-9">9° ano Ensino Fundamental</option>
            <option value="medio-1">1° ano Ensino Médio</option>
            <option value="medio-2">2° ano Ensino Médio</option>
            <option value="medio-3">3° ano Ensino Médio</option>
            <option value="medio-completo">Ensino Médio Completo</option>
            <option value="nao-estudando">Não estou estudando</option>
            <option value="superior-cursando">Ensino Superior - Cursando</option>
          </select>

          {campoErro("escolaridade")}

          {estuda && (
            <div className="campo-condicional">
              <label htmlFor="frequencia-escolar">
                Qual a porcentagem da sua frequência escolar?
              </label>
              <p className="campo-ajuda">
                Só são aceitos jovens com frequência de no mínimo 75%
              </p>
              <input
                type="number"
                id="frequencia-escolar"
                name="frequenciaEscolar"
                value={form.frequenciaEscolar}
                onChange={atualizarCampo}
                min="0"
                max="100"
                step="1"
                placeholder="Ex: 85"
                required
              />
              {campoErro("frequencia-escolar")}
            </div>
          )}

          <label htmlFor="turno-escola">
            Qual turno você vai para a escola?
          </label>
          <select
            id="turno-escola"
            name="turnoEscola"
            value={form.turnoEscola}
            onChange={atualizarCampo}
            required
          >
            <option value="">Selecione</option>
            <option value="manha">Manhã</option>
            <option value="tarde">Tarde</option>
            <option value="noite">Noite</option>
            <option value="nao-estudo">Não estudo</option>
          </select>
        </fieldset>

        <fieldset className="fieldset__formulario">
          <legend>Situação Socioeconômica e Familiar</legend>

          <label htmlFor="pessoas-casa">
            Quem são as pessoas que moram com você, na mesma casa?
          </label>
          <textarea
            id="pessoas-casa"
            name="pessoasCasa"
            rows={3}
            value={form.pessoasCasa}
            onChange={atualizarCampo}
            required
          />

          <label htmlFor="renda-familiar">
            Somando o salário de todos que moram na sua casa, qual o valor
            total da renda mensal?
          </label>
          <select
            id="renda-familiar"
            name="rendaFamiliar"
            value={form.rendaFamiliar}
            onChange={atualizarCampo}
            required
          >
            <option value="">Selecione</option>
            <option value="0-500">R$0,00 até R$500,00</option>
            <option value="501-1000">R$501,00 até R$1000,00</option>
            <option value="1001-1500">R$1001,00 até R$1500,00</option>
            <option value="1501-2000">R$1501,00 até R$2000,00</option>
            <option value="2001-2500">R$2001,00 até R$2500,00</option>
            <option value="2501-3000">R$2501,00 até R$3000,00</option>
            <option value="3001+">Mais de R$3001,00</option>
          </select>

          <label>Reside em Acolhimento Institucional?</label>
          <div className="grupo-radio">
            {["sim", "nao"].map((valor) => (
              <label key={valor}>
                <input
                  type="radio"
                  name="acolhimento"
                  value={valor}
                  checked={form.acolhimento === valor}
                  onChange={atualizarCampo}
                  required
                />
                {valor === "sim" ? "Sim" : "Não"}
              </label>
            ))}
          </div>

          {form.acolhimento === "sim" && (
            <div className="campo-condicional">
              <label htmlFor="acolhimento-qual">Qual?</label>
              <input
                id="acolhimento-qual"
                name="acolhimentoQual"
                value={form.acolhimentoQual}
                onChange={atualizarCampo}
                required
              />
            </div>
          )}

          <label>Você possui alguma deficiência?</label>
          <div className="grupo-radio">
            {["sim", "nao"].map((valor) => (
              <label key={valor}>
                <input
                  type="radio"
                  name="deficiencia"
                  value={valor}
                  checked={form.deficiencia === valor}
                  onChange={atualizarCampo}
                  required
                />
                {valor === "sim" ? "Sim" : "Não"}
              </label>
            ))}
          </div>

          {form.deficiencia === "sim" && (
            <div className="campo-condicional">
              <label htmlFor="deficiencia-qual">Qual?</label>
              <input
                id="deficiencia-qual"
                name="deficienciaQual"
                value={form.deficienciaQual}
                onChange={atualizarCampo}
                required
              />
            </div>
          )}

          <label>Já fez algum curso na Fundação Pão dos Pobres?</label>
          <div className="grupo-radio">
            {["sim", "nao"].map((valor) => (
              <label key={valor}>
                <input
                  type="radio"
                  name="jaFezCurso"
                  value={valor}
                  checked={form.jaFezCurso === valor}
                  onChange={atualizarCampo}
                  required
                />
                {valor === "sim" ? "Sim" : "Não"}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="fieldset__formulario">
          <legend>Sobre Você</legend>

          <label htmlFor="expectativa">
            Qual a sua expectativa em relação ao curso escolhido?
          </label>
          <textarea
            id="expectativa"
            name="expectativa"
            rows={4}
            value={form.expectativa}
            onChange={atualizarCampo}
            required
          />

          <label htmlFor="historia-vida">
            Para que possamos te conhecer, conte sua história de vida
          </label>
          <textarea
            id="historia-vida"
            name="historiaVida"
            rows={6}
            value={form.historiaVida}
            onChange={atualizarCampo}
            required
          />

          <label htmlFor="porque-escolher">
            Dentre tantos jovens interessados nos cursos, por que devemos
            escolher você para receber uma das vagas?
          </label>
          <textarea
            id="porque-escolher"
            name="porqueEscolher"
            rows={4}
            value={form.porqueEscolher}
            onChange={atualizarCampo}
            required
          />
        </fieldset>

        <fieldset className="fieldset__formulario">
          <legend>Consentimento</legend>

          <div className="linha-checkbox">
            <label className="consentimento" htmlFor="consentimento-lgpd">
              <input
                type="checkbox"
                id="consentimento-lgpd"
                name="consentimentoLgpd"
                checked={form.consentimentoLgpd}
                onChange={atualizarCampo}
                required
              />
              <span>
                Autorizo o uso dos meus dados pessoais para fins de análise e
                seleção no processo seletivo da Fundação O Pão dos Pobres,
                conforme a Lei Geral de Proteção de Dados (LGPD).
              </span>
            </label>
          </div>
        </fieldset>

        <button type="submit" className="btn" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar inscrição"}
        </button>
      </form>

      {modalAberto && (
        <div
          className="modal-fundo"
          role="dialog"
          aria-modal="true"
          aria-labelledby="titulo-agradecimento"
        >
          <div className="modal-conteudo">
            <h2 id="titulo-modal-conteudo">Inscrição validada!</h2>
            <p className="paragrafo-modal-conteudo">Seus dados foram recebidos com sucesso.</p>
            <button
              type="button"
              id="fecharModal"
              onClick={() => setModalAberto(false)}
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </section>
    <VoltarHome />
    </>
  )
}
