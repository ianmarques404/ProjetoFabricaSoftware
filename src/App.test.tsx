import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import { App } from './app';

test('Renderiza o título corretamente', () => {
  render(<App />);
  expect(screen.getByPlaceholderText('Busque em suas tarefas aqui...')).toBeInTheDocument();
});
