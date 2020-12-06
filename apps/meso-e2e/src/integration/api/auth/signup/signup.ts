import * as faker from 'faker';
import { AuthSignupRequestDto } from '@iwdf/dto';

const apiUrlAuthSignup = `${Cypress.env('apiUrl')}/api/auth/signup`;
import { dropUserCollection } from '../../../../../../api/src/app/utils/drop-user-collection.utils';

const email = faker.internet.email().toLowerCase();
const username = faker.internet
  .userName()
  .replace(/[^A-Za-z]/g, '')
  .toLowerCase();
const password = faker.internet.password();

const userInvalidUsername: AuthSignupRequestDto = {
  username: `${username}.`,
  email: email,
  password: password,
};

const userInvalidPassword: AuthSignupRequestDto = {
  username: username,
  email: email,
  password: '123',
};

const userValid: AuthSignupRequestDto = {
  username,
  email,
  password,
};

describe('api meso signup', () => {
  beforeEach(() => {
    // dropUserCollection();
  });
  it('Should response with 422 status for invalid username', () => {
    cy.request({
      method: 'POST',
      url: apiUrlAuthSignup,
      body: userInvalidUsername,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body.errors[0].msg).to.eq(
        'Username has non-alphanumeric characters.'
      );
    });
  });

  it('Should response with 422 status for invalid password', () => {
    cy.log(username);
    cy.request({
      method: 'POST',
      url: apiUrlAuthSignup,
      body: userInvalidPassword,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(422);
      expect(response.body.errors[0].msg).to.eq(
        'Password must be 6 characters or greater.'
      );
    });
  });

  it('Should response with 200 status for valid user', () => {
    cy.log(username);
    cy.request({
      method: 'POST',
      url: apiUrlAuthSignup,
      body: userValid,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body._id).to.not.be.undefined;
      expect(response.body.email).to.eq(email);
      expect(response.body.username).to.eq(username);
    });
  });
});
