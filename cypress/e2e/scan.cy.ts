/// <reference types="cypress" />

describe('Scanare produs - BeautyScan', () => {
  it('autentificare și navigare la scanare', () => {
    const email = 'malinalorena8@gmail.com';
    const password = 'Miauuu777.';

    cy.visit('http://localhost:8081');

    //  Login
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('[data-testid="loginBtn"]').click();

    //  Verificare buton scanare
    cy.get('[data-testid="scanButton"]').should('exist');

    //  Click pe scanare
    cy.get('[data-testid="scanButton"]').click();

    //  Verificare că s-a ajuns pe pagina de scanare
    cy.get('[data-testid="scanScreen"]').should('exist');
  });
});
