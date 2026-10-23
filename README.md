# Aprendizagem Pão dos Pobres — Front-end

Este é o repositório **front-end** do projeto full stack de melhoria do sistema de aprendizagem profissional da **Fundação O Pão dos Pobres**, em Porto Alegre/RS.

O objetivo é oferecer um portal onde jovens possam conhecer os cursos da Fundação, tirar dúvidas e se inscrever online, além de um painel para as funcionárias acompanharem as inscrições.

> 🚧 Projeto em desenvolvimento.

## O que o projeto terá

**Portal público**
- Informações claras sobre cada curso
- Seção de perguntas frequentes (FAQ)
- Formulário de inscrição online com validação de campos
- Integração futura com chatbot/IA

**Painel administrativo (para as funcionárias)**
- Visualização das inscrições
- Filtros por curso, idade, localização e escolaridade
- Organização dos candidatos em: pendentes, aprovados/ativos, reprovados e desligados (com histórico)

## Tecnologias

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Node.js](https://nodejs.org/pt-br) + npm
- ESLint

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- **[Node.js](https://nodejs.org/pt-br)** (versão LTS recomendada). O **npm** já vem incluído na instalação.
- **[Git](https://git-scm.com/)**, para clonar o repositório.

Para conferir se estão instalados, rode no terminal:

```bash
node -v
npm -v
git --version
```

Se cada comando mostrar um número de versão, está tudo pronto.

## Como rodar localmente

```bash
# 1. clonar o repositório
git clone https://github.com/wilgnerdev/aprendizagem-paodospobres.git

# 2. entrar na pasta do projeto
cd aprendizagem-paodospobres

# 3. instalar as dependências
npm install

# 4. iniciar o servidor de desenvolvimento
npm run dev
```

Depois, acesse o endereço exibido no terminal (geralmente `http://localhost:5173`).

## Estrutura de pastas

```
├── public/                 # arquivos estáticos
├── src/
│   ├── components/
│   │   └── Header/         # componente de cabeçalho (Header.jsx + Header.css)
│   ├── styles/
│   │   ├── global.css      # estilos globais
│   │   └── tokens.css      # variáveis de design (cores, espaçamentos, fontes)
│   ├── App.jsx             # componente raiz
│   └── main.jsx            # ponto de entrada da aplicação
├── index.html              # página principal
├── eslint.config.js        # configuração do ESLint
├── vite.config.js          # configuração do Vite
└── package.json            # dependências e scripts
```

## Back-end

A API (Java + Spring Boot) e o banco de dados ficam em um repositório separado.

## Contexto

Projeto desenvolvido como projeto final da formação **Dev Full Stack Júnior** da +praTI / Codifica.

## Autor

**Wilgner dos Santos Guimarães** — [@wilgnerdev](https://github.com/wilgnerdev)