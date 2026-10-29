import { cursos, escolaridades, regrasInscricao } from "../data/cursos.js";

export function calcularIdade(dataNascimento) {
    const [ano, mes, dia] = dataNascimento.split("-").map(Number);

    const hoje = new Date();
    const nascimento = new Date(ano, mes - 1, dia);

    let idade = hoje.getFullYear() - nascimento.getFullYear();

    const aniversarioAindaNaoChegou =
        hoje.getMonth() < nascimento.getMonth() ||
        (
            hoje.getMonth() === nascimento.getMonth() &&
            hoje.getDate() < nascimento.getDate()
        );

    if (aniversarioAindaNaoChegou) {
        idade--;
    }

    return idade;
}

export function validarCandidato({ cursoId, idade, escolaridade, pcd, frequencia }) {
    const curso = cursos.find(curso => curso.id === cursoId);

    // dataNascimento vazia ou inválida produz NaN em calcularIdade
    if(Number.isNaN(idade)) {
        return {
            valido: false,
            motivo: "data-nascimento",
            mensagem: "Idade inválida ou não informada."
        }
    }

    if (!curso) {
        return {
            valido: false,
            motivo: "curso",
            mensagem: "Curso não encontrado."
        };
    }

    const escolaridadesQueEstudam = [
    "fund-7",
    "fund-8",
    "fund-9",
    "medio-1",
    "medio-2",
    "medio-3"
    ];

    const estuda = escolaridadesQueEstudam.includes(escolaridade);

    const requisitos = curso.requisitos;

    // Idade mínima
    if (idade < requisitos.idadeMinima) {
        return {
            valido: false,
            motivo: "idade-minima",
            mensagem: `A idade mínima para o curso de ${curso.titulo} é ${requisitos.idadeMinima} anos.`
        };
    }

    // Idade máxima
    // PCD não possui limite máximo de idade
    const semLimiteDeIdade = pcd && regrasInscricao.pcdSemLimiteIdade;

    if (
        !semLimiteDeIdade &&
        idade > requisitos.idadeMaxima
    ) {
        return {
            valido: false,
            motivo: "idade-maxima",
            mensagem: `A idade máxima para o curso de ${curso.titulo} é ${requisitos.idadeMaxima} anos.`
        };
    }

    // Escolaridade existe no nosso mapa?
    if (!Object.hasOwn(escolaridades, escolaridade)) {
        return {
            valido: false,
            motivo: "escolaridade-invalida",
            mensagem: "Escolaridade não reconhecida."
        };
    }

    // Escolaridade mínima
    if (
        escolaridades[escolaridade] <
        escolaridades[requisitos.escolaridadeMinima]
    ) {
        return {
            valido: false,
            motivo: "escolaridade",
            mensagem: "A escolaridade informada não atende ao requisito mínimo do curso."
        };
    }

    // Frequência escolar mínima e válida

    if (estuda && frequencia === null) {
        return {
            valido: false,
            motivo: "frequencia",
            mensagem: "Campo obrigatório!"
        };
    }

    if (estuda && frequencia < 75) {
        return {
            valido: false,
            motivo: "frequencia",
            mensagem: "Sua frequência escolar deve ser de no mínimo 75% para se inscrever neste curso."
        };
    }

    return {
        valido: true,
        motivo: null,
        mensagem: "Candidato atende aos requisitos do curso."
    };

}
