
# Projeto - Minhas Tarefas

Projeto desenvolvido como parte da disciplina de **Fábrica de Software**, 7º semestre do curso de Engenharia de Software.

## Descrição

Este é um projeto simples de gerenciamento de tarefas, desenvolvido com as seguintes tecnologias:

- **React** (com TypeScript)
- **Tailwind CSS**
- **Vite** (ambiente de build e desenvolvimento)

## Funcionalidades atuais

- Criação, edição, exclusão e filtragem de tarefas.
- Reconhecimento de voz para facilitar a criação de tarefas (via Web Speech API).
- Persistência dos dados via `localStorage`.

## Testes

- Implementação inicial de testes utilizando o **Jest**.
- Até o momento, os testes são **manuais**, mas já foram configurados e testados com sucesso.
- O arquivo `App.test.tsx` é o único teste automatizado presente no momento.

### Comandos úteis

- Para rodar a aplicação localmente:

  ```bash
  npm run dev
  ```

  A aplicação será aberta no navegador no endereço `http://localhost:5173`.

- Para rodar os testes com o Jest:

  ```bash
  npm run test
  ```

## Integração Contínua (CI)

O projeto utiliza **GitHub Actions** com workflows configurados para executar os testes automaticamente a cada **push** ou **pull request** nas branches `main` e `feature/test`.

Os workflows foram testados e estão funcionando corretamente — tanto em cenários de sucesso quanto de falha.

## Imagens e Evidências

Estão anexadas neste repositório imagens que mostram:

- Execução dos testes com sucesso e falha via Jest.
- ![c537a998-578c-41fa-9c5c-2bdac3dd4a38](https://github.com/user-attachments/assets/08600a25-d5c1-4a64-bf09-69c4bb51a18c)
- ![image](https://github.com/user-attachments/assets/1b8a53d2-872c-4944-9336-aee05fadba01)


- Funcionamento da integração contínua com GitHub Actions.
- ![c536dd0c-d70e-49f8-a2ce-aad238900546](https://github.com/user-attachments/assets/e4379237-33ca-48b1-a1a4-0b72d5b84296)
- ![image](https://github.com/user-attachments/assets/314135ed-3370-4870-a039-1331aa6707cc)

---

> ⚠️ *Este projeto está em desenvolvimento. Novas funcionalidades e melhorias serão adicionadas ao longo do tempo.*
