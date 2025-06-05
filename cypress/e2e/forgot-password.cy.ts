/// <reference types="cypress" />

describe('Forgot Password - BeautyScan', () => {
  it('navighează, completează emailul și trimite resetarea', () => {
    const email = 'malinalorena8@gmail.com';

    //  Deschide pagina principală (login)
    cy.visit('http://localhost:8081');

    //  Click pe link-ul de "Forgot your password?"
    cy.contains('Forgot your password?').click();

    //  Confirmăm că suntem pe pagina de resetare
    cy.url().should('include', '/forgot-password');
    cy.contains('Reset Password').should('exist');

    //  Completăm emailul
    cy.get('input[placeholder*="email"]').type(email);

    // Trimitem formularul
    cy.get('[data-testid="resetBtn"]').should('exist').click();

    //  Verificăm că suntem redirecționați înapoi la login
    cy.url().should('include', '/login');
    cy.get('input[placeholder="Email"]').should('exist');
  });
});
