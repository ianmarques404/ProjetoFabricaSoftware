import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';
import { toast } from 'sonner'; // Certifique-se de que você está importando o 'toast' corretamente.

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

test('verifica se o toast.success é chamado ao atualizar uma tarefa', async () => {
  render(<App />);

  // Criar uma tarefa inicialmente para poder atualizar
  const title = 'Tarefa inicial';
  const content = 'Conteúdo da tarefa';
  const status = 'Pendente';
  
  fireEvent.change(screen.getByPlaceholderText(/busque em suas tarefas aqui/i), {
    target: { value: title },
  });
  fireEvent.click(screen.getByText(/Criar tarefa/i));

  // Agora vamos simular a atualização dessa tarefa

  // Supondo que o botão de editar tarefa está visível após a criação da tarefa.
  // A primeira tarefa na lista será a que criamos
  const editButton = screen.getAllByText('Editar')[0]; // Altere esse texto de acordo com o seu botão de editar
  fireEvent.click(editButton);

  // Simulando a alteração de título e conteúdo
  fireEvent.change(screen.getByPlaceholderText(/Novo título/i), {
    target: { value: 'Novo título da tarefa' },
  });
  fireEvent.change(screen.getByPlaceholderText(/Novo conteúdo/i), {
    target: { value: 'Novo conteúdo da tarefa' },
  });

  // Atualizando o status da tarefa
  fireEvent.change(screen.getByLabelText(/Status/i), {
    target: { value: 'Concluido' },
  });

  // Agora clicamos no botão de salvar a atualização
  fireEvent.click(screen.getByText(/Salvar/i));

  // Verificar se o toast.success foi chamado com a mensagem correta
  await waitFor(() => expect(toast.success).toHaveBeenCalledWith('Tarefa atualizada com sucesso!'));
});
