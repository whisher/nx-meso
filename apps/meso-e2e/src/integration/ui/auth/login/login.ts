import * as authLocalStorage from '../../../../fixtures/auth/localStorageState.json';
import { adaptToReduxPersist } from '../../../../utils/adaptToReduxPersist';

const loginPath = '/auth/login';

describe('meso signup', () => {
  describe('login', () => {
    beforeEach(() => cy.visit(loginPath));

    it('should form submit button to be disabled', () => {
      cy.get('form button').should('be.disabled');
    });

    it('should form submit button to be enabled', () => {
      cy.get('#auth-email').type('e2e@e2e.eu');
      cy.get('#auth-password').type('123123');
      cy.get('form button').should('not.be.disabled');
    });
  });

  describe('skip login page', () => {
    it('should redirect to feed page if token exist', () => {
      cy.visit(loginPath, {
        onBeforeLoad(win) {
          win.localStorage.setItem(
            'persist:root',
            adaptToReduxPersist(authLocalStorage)
          );
        },
      });

      cy.location('pathname').should('eq', '/');
    });
  });
});
