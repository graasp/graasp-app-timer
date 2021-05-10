import { toInteger } from 'lodash';
import {
  COUNTER_HOUR_ID,
  COUNTER_MINUTE_ID,
  COUNTER_NUMBER_CLASS,
  COUNTER_SECOND_ID,
  HEADER_ID,
  PAUSE_COUNTER_ICON_ID,
  PLAY_COUNTER_ICON_ID,
  PLAY_PAUSE_COUNTER_BUTTON_ID,
} from '../../src/constants/selectors';
import {
  APP_INSTANCES_INITIAL_TIME_VALUE,
  APP_INSTANCE_WITH_SETTINGS,
} from '../fixtures/appInstance';

describe('Student View', () => {
  it('default layout', () => {
    cy.onlineVisit();
    // default counter numbers should be 0
    cy.get(`#${COUNTER_MINUTE_ID}`).should('contain', 0);
    cy.get(`#${COUNTER_SECOND_ID}`).should('contain', 0);

    // should be stopped by default
    cy.wait(3000);
    cy.get(`#${COUNTER_MINUTE_ID}`).should('contain', 0);
    cy.get(`#${COUNTER_SECOND_ID}`).should('contain', 0);

    const playButton = cy.get(
      `#${PLAY_PAUSE_COUNTER_BUTTON_ID} #${PLAY_COUNTER_ICON_ID}`,
    );
    playButton.should('exist');
    playButton.click();

    cy.wait(2000);
    cy.get(`#${COUNTER_SECOND_ID} .${COUNTER_NUMBER_CLASS}`)
      .invoke('text')
      .then(val => toInteger(val))
      .should('be.gt', 0);

    cy.get(
      `#${PLAY_PAUSE_COUNTER_BUTTON_ID} #${PAUSE_COUNTER_ICON_ID}`,
    ).click();

    cy.wait(2000);
    cy.get(`#${COUNTER_SECOND_ID} .${COUNTER_NUMBER_CLASS}`)
      .invoke('text')
      .then(val => toInteger(val))
      .should('be.lt', 3);

    // header is not visible by default
    cy.get(`#${HEADER_ID}`).should('not.exist');
  });

  describe('settings', () => {
    it('correct layout given settings', () => {
      cy.onlineVisit({
        appInstance: APP_INSTANCE_WITH_SETTINGS,
      });

      // should start
      cy.wait(3000);
      cy.get(`#${COUNTER_MINUTE_ID}`).should('contain', 19);
      cy.get(`#${COUNTER_SECOND_ID}`).should('not.contain', 0);

      // controls are not visible
      const playButton = cy.get(
        `#${PLAY_PAUSE_COUNTER_BUTTON_ID} #${PAUSE_COUNTER_ICON_ID}`,
      );
      playButton.should('not.exist');

      // header should be visible
      cy.get(`#${HEADER_ID}`).should('be.visible');
    });
  });

  it('displays time correctly', () => {
    APP_INSTANCES_INITIAL_TIME_VALUE.forEach(([appInstance, time]) => {
      cy.onlineVisit({
        appInstance,
      });

      const { hours, minutes, seconds } = time;

      if (hours) {
        cy.get(`#${COUNTER_HOUR_ID}`).should('contain', hours);
      }
      cy.get(`#${COUNTER_MINUTE_ID}`).should('contain', minutes);
      cy.get(`#${COUNTER_SECOND_ID}`).should('contain', seconds);
    });
  });
});
