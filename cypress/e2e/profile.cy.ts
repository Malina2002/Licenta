/// <reference types="cypress" />

describe('Profil BeautyScan - alergii și logout', () => {
  it('autentificare, adăugare alergie și salvare profil', () => {
    const email = 'malinalorena8@gmail.com';
    const password = 'Miauuu777.';
    const newAllergy = 'TestAlergie' + Date.now();

    cy.visit('http://localhost:8081');

    // Login
    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('[data-testid="loginBtn"]').click();

    //  Meniu > Profil
    cy.get('[data-testid="menuBtn"]').click();
    cy.contains('Profile').click();

    //  Confirmare profil
    cy.get('[data-testid="profileScreen"]').should('exist');
    cy.get('[data-testid="usernameInput"]').should('exist');
    cy.get('[data-testid="allergyTitle"]').should('contain', 'Known Allergies');

    // Verificăm alergii sau fallback
    cy.get('body').then(($body) => {
      if ($body.find('[data-testid="allergyItem"]').length > 0) {
        cy.get('[data-testid="allergyItem"]').should('exist');
      } else {
        cy.get('[data-testid="noAllergiesMsg"]').should('exist');
      }
    });

    // Adăugăm o alergie nouă
    cy.get('[data-testid="newAllergyInput"]').type(newAllergy);
    cy.get('[data-testid="addAllergyBtn"]').click();

    //  Verificăm că a apărut în listă
    cy.contains(newAllergy).should('exist');

    // Salvăm profilul
    cy.get('[data-testid="saveProfileBtn"]').click();

    //  Revenim la home
    cy.get('[data-testid="backToHomeBtn"]').click();
    cy.get('[data-testid="scanButton"]').should('exist');
  });
});
