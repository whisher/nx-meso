describe('meso signup', () => {
  beforeEach(() => cy.visit('/auth/login'));

  it('should form submit button to be disabled', () => {
    cy.get('form button').should('be.disabled');
  });

  it('should form submit button to be enabled', () => {
    cy.get('#auth-email').type('e2e@e2e.eu');
    cy.get('#auth-password').type('123123');
    cy.get('form button').should('not.be.disabled');
  });
});
