describe('meso signup', () => {
  beforeEach(() => cy.visit('/auth/signup'));

  it('should form submit button to be disabled', () => {
    cy.get('form button').should('be.disabled');
  });

  it('should form submit button to be enabled', () => {
    cy.get('#signup-username').type('e2e user');
    cy.get('#signup-email').type('e2e@e2e.eu');
    cy.get('#signup-password').type('123123');
    cy.get('form button').should('not.be.disabled');
  });
});
