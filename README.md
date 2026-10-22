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
- [Node.js + npm](https://nodejs.org/pt-br)
- ESLint

## Como rodar localmente

```bash
# instalar dependências
npm install

# iniciar o servidor de desenvolvimento
npm run dev
```

Depois, acesse o endereço exibido no terminal (geralmente `http://localhost:5173`).

## Estrutura de pastas

```
├── public/        # arquivos estáticos
├── src/           # código-fonte da aplicação
├── index.html     # página principal
├── vite.config.js # configuração do Vite
└── package.json   # dependências e scripts
```

## Back-end

A API (Java + Spring Boot) e o banco de dados ficam em um repositório separado.

## Contexto

Projeto desenvolvido como projeto final da formação **Dev Full Stack Júnior** do [+praTI](https://github.com/wilgnerdev) / Codifica.

## Autor

**Wilgner dos Santos Guimarães** — [@wilgnerdev](https://github.com/wilgnerdev)