describe('meso login submit', () => {
  beforeEach(() => {
    cy.server()
    cy.route('POST', '/api/auth/login', 'fx:auth/login').as('login');
    cy.route('GET', '/api/auth/account', 'fx:auth/account').as('account');
    cy.visit('/auth/login');
  });

  it('should after form submit redirect to auth/login', () => {
    cy.get('#auth-email').type('e2e@e2e.eu');
    cy.get('#auth-password').type('123123');
    cy.get('form').submit();
    cy.wait(['@login', '@account']);
    cy.location('pathname').should('eq', '/');
  });
});
