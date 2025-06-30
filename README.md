# Projeto - Minhas Tarefas

Projeto desenvolvido como parte da disciplina de **Fábrica de Software**, 7º semestre do curso de Engenharia de Software.

## Descrição

Este é um projeto simples de gerenciamento de tarefas, desenvolvido com as seguintes tecnologias:

* **React** (com TypeScript)
* **Tailwind CSS**
* **Vite** (ambiente de build e desenvolvimento)
* **Spring Boot** (Java + Maven)
* **MySQL** (persistência de dados)

## Funcionalidades atuais

* Criação, edição, exclusão e filtragem de tarefas.
* Reconhecimento de voz para facilitar a criação de tarefas (via Web Speech API).
* Persistência dos dados em banco de dados **MySQL**, com **Java + Spring Boot** no back-end.

## Testes

* Implementação inicial de testes utilizando o **Jest**.
* Até o momento, os testes são **manuais**, mas já foram configurados e testados com sucesso.
* O arquivo `App.test.tsx` é o único teste automatizado presente no momento.

### Comandos úteis

* Para rodar a aplicação front-end localmente:

  ```bash
  npm run dev
  ```

  A aplicação será aberta no navegador no endereço `http://localhost:5173`.

* Para rodar os testes com o Jest:

  ```bash
  npm run test
  ```

* Para iniciar o back-end com Spring Boot:

  ```bash
  ./mvnw spring-boot:run
  ```

  O back-end será executado no endereço `http://localhost:8080`.

## Integração Contínua (CI)

O projeto utiliza **GitHub Actions** com workflows configurados para executar os testes automaticamente a cada **push** ou **pull request** nas branches `main` e `feature/test`.

Os workflows foram testados e estão funcionando corretamente — tanto em cenários de sucesso quanto de falha.

## Imagens e Evidências

Estão anexadas neste repositório imagens que mostram:

* Execução dos testes com sucesso e falha via Jest.
* Funcionamento da integração contínua com GitHub Actions.

> ⚠️ *Este projeto está em desenvolvimento. Novas funcionalidades e melhorias serão adicionadas ao longo do tempo.*

---
