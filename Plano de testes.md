# Plano de Testes – Projeto de Tarefas com Reconhecimento de Voz

## Objetivo
Garantir que as funcionalidades da aplicação estejam funcionando conforme esperado, incluindo criação, edição, exclusão, filtragem e gravação de voz.

## Funcionalidades Testadas

| ID | Funcionalidade | Tipo de Teste | Cenário | Entrada | Resultado Esperado |
|----|----------------|----------------|---------|---------|---------------------|
| TC01 | Criar tarefa via input de texto | Unitário | Usuário preenche o campo e clica em "Adicionar" | "Comprar pão" | Tarefa adicionada à lista |
| TC02 | Criar tarefa via voz | UI/E2E | Usuário fala "Estudar Java" com microfone ativado | Voz convertida | Tarefa adicionada à lista |
| TC03 | Editar tarefa existente | Unitário | Clicar em "Editar", alterar e salvar | "Estudar Java" → "Estudar React" | Texto alterado na lista |
| TC04 | Excluir tarefa | Unitário | Clicar em "Excluir" | Qualquer tarefa | Tarefa removida da lista |
| TC05 | Filtrar tarefas | Unitário | Selecionar "Completas" no filtro | Lista de tarefas | Apenas tarefas completas são mostradas |

---

### ✅ 2. **Implementar testes unitários e de interface automatizados**

Para isso, use:

- **Jest** (testes unitários)
- **React Testing Library** (testes de componentes)
- **Cypress** (testes E2E)

#### 📦 Instalação (se ainda não fez)

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev cypress
