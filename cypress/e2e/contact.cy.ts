/// <reference types="cypress" />

describe('Pagina de Contact - BeautyScan', () => {
  it('autentificare, accesare contact și trimitere mesaj', () => {
    const email = 'malinalorena8@gmail.com';
    const password = 'Miauuu777.';

    // Vizită inițială
    cy.visit('http://localhost:8081');

    // Login
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('[data-testid="loginBtn"]').click();

    // Deschidere meniu
    cy.get('[data-testid="menuBtn"]').click();

    //  Navigare către Contact
    cy.contains('Contact').click();

    //  Verificare ecran contact
    cy.get('[data-testid="contactScreen"]').should('exist');
    cy.get('[data-testid="contactText"]').should('contain', 'support@beautyscan.com');

    //  Completare formular
    cy.get('[data-testid="contactNameInput"]').type('Test User');
    cy.get('[data-testid="contactEmailInput"]').type('test@example.com');
    cy.get('[data-testid="contactMessageInput"]').type('Acesta este un mesaj de test.');

    //  Trimitere
    cy.get('[data-testid="contactSendButton"]').click();

    //  Verificăm că formularul s-a resetat
    cy.get('[data-testid="contactNameInput"]').should('have.value', '');
    cy.get('[data-testid="contactEmailInput"]').should('have.value', '');
    cy.get('[data-testid="contactMessageInput"]').should('have.value', '');
  });
});
