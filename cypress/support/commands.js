// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//

import { DEFAULT_MODE } from '../../src/config/settings';
import {
  DEFAULT_APP_INSTANCE,
  DEFAULT_SPACE_ID,
  USERS_FIXTURE,
  DEFAULT_USER_ID,
} from '../fixtures/appInstance';

const API_HOST = Cypress.env('API_HOST');

Cypress.Commands.add('closeSettings', () => {
  cy.get('html').click('topRight');
});

Cypress.Commands.add(
  'onlineVisit',
  (
    { appInstance = DEFAULT_APP_INSTANCE, mode, appInstanceResources = [] } = {
      mode: DEFAULT_MODE,
    },
  ) => {
    cy.intercept(
      {
        url: `http://${API_HOST}/app-instances/*`,
        method: 'GET',
      },
      ({ reply }) => {
        reply(appInstance);
      },
    ).as('getAppInstance');

    // intercept post and patch requests to avoid modifying app instance
    cy.intercept(
      {
        url: `http://${API_HOST}/app-instances`,
        method: 'POST',
      },
      ({ reply, body }) => {
        // only requests to URLs starting with 'http://api.example.com/widgets'
        // having the header 'x-requested-with: exampleClient' will be received
        reply(body);
      },
    ).as('postAppInstance');

    // intercept post and patch requests to avoid modifying app instance
    cy.intercept(
      {
        url: `http://${API_HOST}/app-instances/*`,
        method: 'PATCH',
      },
      ({ reply, body }) => {
        // only requests to URLs starting with 'http://api.example.com/widgets'
        // having the header 'x-requested-with: exampleClient' will be received
        reply(body);
      },
    ).as('patchAppInstance');

    cy.intercept(
      {
        url: `http://${API_HOST}/app-instance-resources?*`,
        method: 'GET',
      },
      ({ reply }) => {
        // only requests to URLs starting with 'http://api.example.com/widgets'
        // having the header 'x-requested-with: exampleClient' will be received
        reply(appInstanceResources);
      },
    ).as('getAppInstanceResources');

    cy.intercept(
      {
        url: `http://${API_HOST}/app-instance-resources/1`,
        method: 'PATCH',
      },
      ({ reply, body }) => {
        // only requests to URLs starting with 'http://api.example.com/widgets'
        // having the header 'x-requested-with: exampleClient' will be received
        reply(body);
      },
    ).as('postAppInstanceResource');

    cy.intercept(
      {
        url: `http://${API_HOST}/app-instance-resources/*`,
        method: 'DELETE',
      },
      ({ reply, body }) => {
        // only requests to URLs starting with 'http://api.example.com/widgets'
        // having the header 'x-requested-with: exampleClient' will be received
        reply(body);
      },
    ).as('deleteAppInstanceResource');

    cy.intercept(
      {
        url: `http://${API_HOST}/spaces/${DEFAULT_SPACE_ID}/users`,
        method: 'GET',
      },
      ({ reply }) => {
        // only requests to URLs starting with 'http://api.example.com/widgets'
        // having the header 'x-requested-with: exampleClient' will be received
        reply(USERS_FIXTURE);
      },
    ).as('getUsers');

    cy.visit('/', {
      qs: {
        spaceId: DEFAULT_SPACE_ID,
        appInstanceId: appInstance._id,
        mode,
        userId: DEFAULT_USER_ID,
        dev: true,
      },
    });
  },
);
