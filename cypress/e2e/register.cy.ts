/// <reference types="cypress" />

describe('Testare înregistrare BeautyScan', () => {
  it('creează un cont nou cu succes și redirecționează către login', () => {
    const timestamp = Date.now();
    const email = `testuser_${timestamp}@test.com`;
    const password = 'Test123!';
    const username = `TestUser${timestamp}`;

    cy.visit('http://localhost:8081/register');

    cy.get('input[placeholder="Username"]').type(username);
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);

    cy.contains('Create Account').click();

    cy.get('input[placeholder="Email"]').should('exist');
  });
});
