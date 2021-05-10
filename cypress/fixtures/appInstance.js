import {
  DEFAULT_DIRECTION,
  DEFAULT_TIMER_VISIBLE,
} from '../../src/config/settings';
import { APP_INSTANCE_RESOURCE_TIME } from '../../src/config/appInstanceResourceTypes';

export const DEFAULT_SPACE_ID = '5b56e70ab253020033364411';

const DEFAULT_SETTINGS = {
  headerVisible: false,
  initialTimeValue: 0,
  direction: DEFAULT_DIRECTION,
  startImmediately: false,
  timerVisible: DEFAULT_TIMER_VISIBLE,
};

export const USERS_FIXTURE = [
  {
    id: '5b56e70ab253020033364416',
    name: 'juan carlos',
    spaceId: DEFAULT_SPACE_ID,
  },
  {
    id: '5c055c1083d22e0211c24ad8',
    name: 'pamela',
    spaceId: DEFAULT_SPACE_ID,
  },
];

export const DEFAULT_USER_ID = USERS_FIXTURE[0].id;

const buildAppInstance = ({ id: _id, settings }) => ({
  _id,
  settings: { ...DEFAULT_SETTINGS, ...settings },
  item: '2356e70ab2530200333634a2',
  createdAt: '2019-01-01T00:00:00.000Z',
  updatedAt: '2019-01-01T00:00:00.000Z',
});

export const DEFAULT_APP_INSTANCE = buildAppInstance({
  id: '6156e70ab253020033364411',
  settings: {},
});

const buildAppInstanceResource = ({
  id: _id,
  userId: user,
  appInstanceId: appInstance = DEFAULT_APP_INSTANCE._id,
  time,
}) => ({
  _id,
  user,
  appInstance,
  data: time,
  type: APP_INSTANCE_RESOURCE_TIME,
});

export const APP_INSTANCE_WITH_SETTINGS = buildAppInstance({
  id: 'db-with-settings',
  settings: {
    headerVisible: true,
    initialTimeValue: 20,
    direction: 'backward',
    timerVisible: true,
    startImmediately: true,
  },
});

export const APP_INSTANCE_RESOURCES_FIXTURES = [
  buildAppInstanceResource({ id: 1, userId: USERS_FIXTURE[0].id, time: 4000 }),
  buildAppInstanceResource({
    id: 2,
    userId: USERS_FIXTURE[1].id,
    time: 444000,
  }),
  buildAppInstanceResource({ id: 3, userId: null, time: 9444000 }),
];

export const APP_INSTANCES_INITIAL_TIME_VALUE = [
  [
    buildAppInstance({
      id: '30-seconds',
      settings: {
        initialTimeValue: 0.5,
      },
    }),
    { minutes: 0, seconds: 30 },
  ],
  [
    buildAppInstance({
      id: '1-minute',
      settings: {
        initialTimeValue: 1,
      },
    }),
    { minutes: 1, seconds: 0 },
  ],
  [
    buildAppInstance({
      id: '1-hour',
      settings: {
        initialTimeValue: 60,
      },
    }),
    { hours: 1, minutes: 0, seconds: 0 },
  ],
  [
    buildAppInstance({
      id: '1-hours-30',
      settings: {
        initialTimeValue: 90,
      },
    }),
    { hours: 1, minutes: 30, seconds: 0 },
  ],
  [
    buildAppInstance({
      id: '1-hours-30-min-30-sec',
      settings: {
        initialTimeValue: 90.5,
      },
    }),
    { hours: 1, minutes: 30, seconds: 30 },
  ],
];
