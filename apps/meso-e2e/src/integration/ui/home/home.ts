describe('meso home', () => {
  beforeEach(() => cy.visit('/'));

  it('should display Welcome in Meso and localStorage set to en', () => {
    cy.get('[value="en"]')
      .click()
      .should(() => {
        const storage = JSON.parse(localStorage.getItem('persist:root'));
        const language = JSON.parse(storage.lang).language;
        expect(language).to.eq('en');
      });
    cy.get('.makeStyles-h2-12').contains('Welcome in Meso');
  });

  it('should display Benvenuto in Meso and localStorage set to it', () => {
    cy.get('[value="it"]')
      .click()
      .should(() => {
        const storage = JSON.parse(window.localStorage.getItem('persist:root'));
        const language = JSON.parse(storage.lang).language;
        cy.log(language);
        expect(language).to.eq('it');
      });
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
