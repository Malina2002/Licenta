/// <reference types="cypress" />

describe('Logout BeautyScan', () => {
  it('autentificare și logout cu succes', () => {
    const email = 'malinalorena8@gmail.com';
    const password = 'Miauuu777.';

    cy.visit('http://localhost:8081');

    // 🔐 Login
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('[data-testid="loginBtn"]').click();

    //  Deschide meniul
    cy.get('[data-testid="menuBtn"]').click();

    //  Click pe logout (cu forțare pentru stabilitate)
    cy.get('[data-testid="logoutBtn"]').should('exist').click({ force: true });

    //  Confirmare revenire la login
    cy.get('input[placeholder="Email"]').should('exist');
  });
});
