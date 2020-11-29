describe('meso signup submit', () => {
  beforeEach(() => {
    cy.server();
    cy.route('POST', '/api/auth/signup', 'fx:auth/signup').as('signup');
    cy.visit('/auth/signup');
  });

  it('should after form submit redirect to auth/confirm', () => {
    cy.get('#signup-username').type('e2e user');
    cy.get('#signup-email').type('e2e@e2e.eu');
    cy.get('#signup-password').type('123123');
    cy.get('form').submit();
    cy.wait('@signup');
    cy.location('pathname').should('eq', '/auth/confirm');
  });
});
