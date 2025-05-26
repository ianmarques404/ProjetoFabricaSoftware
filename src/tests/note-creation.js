import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

test("adiciona uma nova tarefa via input", () => {
  render(<App />);
  const input = screen.getByPlaceholderText("Digite uma tarefa...");
  const button = screen.getByText("Adicionar");

  fireEvent.change(input, { target: { value: "Nova tarefa" } });
  fireEvent.click(button);

  expect(screen.getByText("Nova tarefa")).toBeInTheDocument();
});
