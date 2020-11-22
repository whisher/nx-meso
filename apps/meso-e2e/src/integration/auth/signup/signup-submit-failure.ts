describe('meso signup submit failure', () => {
  beforeEach(() => {
    cy.server();

    cy.route({
      method: 'POST',
      url: '/api/auth/signup',
      response: {},
      status: 500,
    }).as('signupFailure');

    cy.visit('/auth/signup');
  });

  it('should after form submit with error show alert', () => {
    cy.get('#signup-username').type('e2e user');
    cy.get('#signup-email').type('e2e@e2e.eu');
    cy.get('#signup-password').type('123123');
    cy.get('form').submit();
    cy.wait('@signupFailure');
    cy.get('.MuiAlert-message').should('exist');
  });
});
