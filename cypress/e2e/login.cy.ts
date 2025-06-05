/// <reference types="cypress" />

describe('Testare Login BeautyScan', () => {
  it('se autentifică cu succes și ajunge în pagina principală', () => {
    cy.visit('http://localhost:8081'); // sau portul tău actual

    cy.get('input[placeholder="Email"]').type('malinalorena8@gmail.com');
    cy.get('input[placeholder="Password"]').type('Miauuu777.');

    cy.get('[data-testid="loginBtn"]').click();

    //  Confirmăm că suntem în index și că butonul de scanare e vizibil
    cy.get('[data-testid="scanButton"]').should('exist');
  });
});
