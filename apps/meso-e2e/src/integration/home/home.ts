describe('meso home', () => {
  beforeEach(() => cy.visit('/'));

  it('should display Welcome in Meso', () => {
    cy.get('.makeStyles-h2-12').contains('Welcome in Meso');
  });

  it('should display Benvenuto in Meso', () => {
    cy.get('[value="it"]').click();
    cy.get('.makeStyles-h2-12').contains('Benvenuto in Meso');
  });

  it('should pathname equal to /auth/signup after click', () => {
    cy.get(
      '.makeStyles-cta-14 > .MuiButtonBase-root > .MuiButton-label'
    ).click();
    cy.location('pathname').should('eq', '/auth/signup');
  });

  it('should pathname equal to /auth/login after click', () => {
    cy.get(
      '.makeStyles-account-3 > .MuiButtonBase-root > .MuiButton-label'
    ).click();
    cy.location('pathname').should('eq', '/auth/login');
  });
});
