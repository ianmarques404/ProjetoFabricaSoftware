describe("Adicionar tarefa", () => {
  it("deve adicionar uma tarefa ao clicar no botão", () => {
    cy.visit("http://localhost:5173");
    cy.get("input[placeholder='Digite uma tarefa...']").type("Tarefa E2E");
    cy.contains("Adicionar").click();
    cy.contains("Tarefa E2E").should("exist");
  });
});
