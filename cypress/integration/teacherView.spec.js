import { BACKWARD_DIRECTION, TEACHER_MODES } from '../../src/config/settings';
import {
  buildConfirmDialogConfirmButtonId,
  buildDeleteButtonId,
  buildResponseTableRowId,
  DIRECTION_BACKWARD_RADIO_ID,
  DIRECTION_FORWARD_RADIO_ID,
  HEADER_VISIBILITY_SWITCH_ID,
  INITIAL_TIME_VALUE_TEXTFIELD_ID,
  RESPONSES_TABLE_ID,
  SETTINGS_FAB_BUTTON_ID,
  START_TIMER_AUTOMATICALLY_SWITCH_ID,
  TIMER_VISIBILITY_SWITCH_ID,
} from '../../src/constants/selectors';
import {
  APP_INSTANCE_RESOURCES_FIXTURES,
  DEFAULT_APP_INSTANCE,
  USERS_FIXTURE,
} from '../fixtures/appInstance';

describe('Teacher View', () => {
  it('default layout', () => {
    cy.onlineVisit({ mode: TEACHER_MODES[0] });

    // empty table
    cy.get(`#${RESPONSES_TABLE_ID}`)
      .get('td')
      .should('not.exist');
  });

  it('with data layout', () => {
    cy.onlineVisit({
      mode: TEACHER_MODES[0],
      appInstanceResources: APP_INSTANCE_RESOURCES_FIXTURES,
    });

    // table should contain app instance resources
    APP_INSTANCE_RESOURCES_FIXTURES.forEach(({ user, _id }) => {
      const userName =
        USERS_FIXTURE.find(({ id }) => id === user)?.name || 'Unknown';
      cy.get(`#${RESPONSES_TABLE_ID} #${buildResponseTableRowId(_id)}`)
        .should('exist')
        .should('contain', userName);
    });

    // can delete resource
    const { _id } = APP_INSTANCE_RESOURCES_FIXTURES[1];
    cy.get(`#${RESPONSES_TABLE_ID}  #${buildDeleteButtonId(_id)}`).click();
    cy.get(`#${buildConfirmDialogConfirmButtonId(_id)}`).click();
    cy.wait(`@deleteAppInstanceResource`).then(({ response: { url } }) => {
      expect(url).to.match(new RegExp(`${_id}$`));
    });
  });

  describe('Settings', () => {
    beforeEach(() => {
      cy.onlineVisit({
        mode: TEACHER_MODES[0],
      });
      cy.get(`#${SETTINGS_FAB_BUTTON_ID}`).click();
    });

    it('header visibility', () => {
      cy.get(`#${HEADER_VISIBILITY_SWITCH_ID}`).should('not.be.checked');

      cy.get(`#${HEADER_VISIBILITY_SWITCH_ID}`).check();

      cy.closeSettings();

      cy.wait('@patchAppInstance').then(
        ({
          response: {
            url,
            body: {
              settings: { headerVisible },
            },
          },
        }) => {
          expect(url).to.match(new RegExp(`${DEFAULT_APP_INSTANCE._id}$`));
          expect(headerVisible).equal(true);
        },
      );
    });

    it('timer visibility', () => {
      cy.get(`#${TIMER_VISIBILITY_SWITCH_ID}`).should('be.checked');

      cy.get(`#${TIMER_VISIBILITY_SWITCH_ID}`).uncheck();

      cy.closeSettings();

      cy.wait('@patchAppInstance').then(
        ({
          response: {
            url,
            body: {
              settings: { timerVisible },
            },
          },
        }) => {
          expect(url).to.match(new RegExp(`${DEFAULT_APP_INSTANCE._id}$`));
          expect(timerVisible).equal(false);
        },
      );
    });

    it('start timmer automatically', () => {
      cy.get(`#${START_TIMER_AUTOMATICALLY_SWITCH_ID}`).should(
        'not.be.checked',
      );

      cy.get(`#${START_TIMER_AUTOMATICALLY_SWITCH_ID}`).check();

      cy.closeSettings();

      cy.wait('@patchAppInstance').then(
        ({
          response: {
            url,
            body: {
              settings: { startImmediately },
            },
          },
        }) => {
          expect(url).to.match(new RegExp(`${DEFAULT_APP_INSTANCE._id}$`));
          expect(startImmediately).equal(true);
        },
      );
    });

    it('initial time value', () => {
      cy.get(`#${INITIAL_TIME_VALUE_TEXTFIELD_ID}`).should('have.value', 0);

      cy.get(`#${INITIAL_TIME_VALUE_TEXTFIELD_ID}`)
        // type right arrow to avoid default value (0) to be appended
        .type('{rightarrow}12');

      cy.closeSettings();

      cy.wait('@patchAppInstance').then(
        ({
          response: {
            url,
            body: {
              settings: { initialTimeValue },
            },
          },
        }) => {
          expect(url).to.match(new RegExp(`${DEFAULT_APP_INSTANCE._id}$`));
          expect(initialTimeValue).equal(12);
        },
      );
    });

    it('timer direction', () => {
      cy.get(`#${DIRECTION_BACKWARD_RADIO_ID} input`).should('not.be.checked');
      cy.get(`#${DIRECTION_FORWARD_RADIO_ID} input`).should('be.checked');

      cy.get(`#${DIRECTION_BACKWARD_RADIO_ID} input`).check();
      cy.get(`#${DIRECTION_FORWARD_RADIO_ID} input`).should('not.be.checked');

      cy.closeSettings();

      cy.wait('@patchAppInstance').then(
        ({
          response: {
            url,
            body: {
              settings: { direction },
            },
          },
        }) => {
          expect(url).to.match(new RegExp(`${DEFAULT_APP_INSTANCE._id}$`));
          expect(direction).equal(BACKWARD_DIRECTION);
        },
      );
    });
  });
});
