describe('meso signup submit', () => {
  beforeEach(() => {
    cy.server();

    cy.route({
      method: 'POST',
      url: '/api/auth/login',
      response: {},
      status: 500,
    }).as('loginFailure');

    cy.visit('/auth/signup');
  });

  it('should after form submit with error show alert', () => {
    cy.get('#auth-email').type('e2e@e2e.eu');
    cy.get('#auth-password').type('123123');
    cy.get('form').submit();
    cy.wait('@loginFailure');
    cy.get('.MuiAlert-message').should('exist');
  });
});
