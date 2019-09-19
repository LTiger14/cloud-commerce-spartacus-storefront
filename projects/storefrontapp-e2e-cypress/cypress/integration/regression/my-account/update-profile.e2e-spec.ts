import {
  updateProfileTest,
  verifyAsAnonymous,
} from '../../../helpers/update-profile';
import * as login from '../../../helpers/login';

describe('My Account - Update Profile', () => {
  before(() => {
    cy.window().then(win => win.sessionStorage.clear());
  });

  verifyAsAnonymous();

  describe('update profile test for logged in user', () => {
    beforeEach(() => {
      cy.restoreLocalStorage();
    });

    updateProfileTest();

    afterEach(() => {
      cy.saveLocalStorage();
    });

    after(() => {
      login.signOutUser();
    });
  });
});
