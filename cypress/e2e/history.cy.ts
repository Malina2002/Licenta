/// <reference types="cypress" />

describe('Testare Istoric Produse - BeautyScan', () => {
  it('autentificare și accesare istoric', () => {
    const email = 'malinalorena8@gmail.com';
    const password = 'Miauuu777.';

    cy.visit('http://localhost:8081');

    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('[data-testid="loginBtn"]').click();

    //  Deschide meniul
    cy.get('[data-testid="menuBtn"]').click();

    //  Accesează istoricul
    cy.contains('History').click();

    // Verificare ecran istoric
    cy.get('[data-testid="historyScreen"]').should('exist');

    //  Verificare carduri sau fallback
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="historyItem"]').length > 0) {
        cy.get('[data-testid="historyItem"]').should('exist');
      } else {
        cy.contains('Nu există produse scanate').should('exist');
      }
    });
  });
});
