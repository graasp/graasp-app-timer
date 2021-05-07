import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Timer from 'react-compound-timer';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import Grid from '@material-ui/core/Grid';
import Counter from './Counter';
import {
  BACKWARD_DIRECTION,
  FORWARD_DIRECTION,
  SAVE_FREQUENCY_IN_SECONDS,
} from '../../../config/settings';
import {
  patchAppInstanceResource,
  postAppInstanceResource,
} from '../../../actions';
import { APP_INSTANCE_RESOURCE_TIME } from '../../../config/appInstanceResourceTypes';
import {
  COUNTER_MINUTE_ID,
  COUNTER_HOUR_ID,
  COUNTER_SECOND_ID,
  PLAY_PAUSE_COUNTER_BUTTON_ID,
  PAUSE_COUNTER_ICON_ID,
  PLAY_COUNTER_ICON_ID,
} from '../../../constants/selectors';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  gridRow: {
    width: '100%',
  },
}));

export const StudentView = props => {
  const {
    t,
    initialTimeValue,
    direction,
    userId,
    tool,
    timerVisible,
    dispatchPostAppInstanceResource,
    dispatchPatchAppInstanceResource,
    timeResource,
    startImmediately,
    handleStart,
    started,
  } = props;
  const classes = useStyles();
  const ONE_HOUR_IN_MINS = 60;
  const ONE_MINUTE_IN_MILLIS = 60000;
  const ONE_SECOND_IN_MILLIS = 1000;

  const timeResourceId = timeResource && (timeResource.id || timeResource._id);
  const timeResourceData = timeResourceId ? timeResource.data : null;

  const startAuto = startImmediately || started;

  const initialTime =
    timeResourceData || initialTimeValue * ONE_MINUTE_IN_MILLIS;

  return (
    <div>
      <Timer
        initialTime={initialTime}
        startImmediately={startAuto}
        direction={direction}
      >
        {({ start, pause, getTime }) => {
          // save every 10s
          const timeInSeconds = Math.round(getTime() / ONE_SECOND_IN_MILLIS);
          const initialTimeInSeconds = initialTime / ONE_SECOND_IN_MILLIS;

          if (
            timeInSeconds &&
            initialTimeInSeconds !== timeInSeconds &&
            timeInSeconds % SAVE_FREQUENCY_IN_SECONDS === 0
          ) {
            // save to the database in millis
            const timeInMillis = timeInSeconds * ONE_SECOND_IN_MILLIS;
            if (timeResourceId) {
              dispatchPatchAppInstanceResource({
                id: timeResourceId,
                data: timeInMillis,
              });
            } else {
              dispatchPostAppInstanceResource({
                data: timeInMillis,
                userId,
                type: APP_INSTANCE_RESOURCE_TIME,
              });
            }
          }
          const TIME_ZERO = 0;
          const currentHour = Math.floor(
            getTime() / ONE_MINUTE_IN_MILLIS / ONE_HOUR_IN_MINS,
          );

          return (
            <div
              style={{ visibility: timerVisible ? 'visible' : 'hidden' }}
              className={classes.root}
            >
              <Grid className={classes.gridRow} container spacing={3}>
                <Grid item xs place-content="center">
                  <Grid
                    className={classes.gridRow}
                    container
                    spacing={3}
                    direction={tool ? 'column' : 'row'}
                    alignItems="center"
                  >
                    {currentHour > TIME_ZERO && (
                      <Counter
                        id={COUNTER_HOUR_ID}
                        timeValue={<Timer.Hours />}
                        timeUnit={t('Hours')}
                      />
                    )}
                    <Counter
                      id={COUNTER_MINUTE_ID}
                      timeValue={<Timer.Minutes />}
                      timeUnit={t('Minutes')}
                    />
                    <Counter
                      id={COUNTER_SECOND_ID}
                      timeValue={<Timer.Seconds />}
                      timeUnit={t('Seconds')}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} align="center">
                  {!startImmediately && (
                    <IconButton
                      id={PLAY_PAUSE_COUNTER_BUTTON_ID}
                      aria-label="Start"
                      color="primary"
                      fontSize="large"
                      onClick={() => {
                        if (started) {
                          pause();
                        } else {
                          start();
                        }
                        handleStart();
                      }}
                    >
                      {started ? (
                        <PauseIcon id={PAUSE_COUNTER_ICON_ID} />
                      ) : (
                        <PlayArrowIcon id={PLAY_COUNTER_ICON_ID} />
                      )}
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Timer>
    </div>
  );
};

StudentView.propTypes = {
  t: PropTypes.func.isRequired,
  initialTimeValue: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([BACKWARD_DIRECTION, FORWARD_DIRECTION])
    .isRequired,
  startImmediately: PropTypes.bool.isRequired,
  started: PropTypes.bool.isRequired,
  tool: PropTypes.bool.isRequired,
  timerVisible: PropTypes.bool.isRequired,
  handleStart: PropTypes.func.isRequired,
  dispatchPostAppInstanceResource: PropTypes.func.isRequired,
  dispatchPatchAppInstanceResource: PropTypes.func.isRequired,
  timeResource: PropTypes.shape({
    data: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

StudentView.defaultProps = {
  timeResource: null,
  userId: null,
};

const mapStateToProps = ({ appInstance, appInstanceResources, context }) => {
  const { userId, tool } = context;
  return {
    initialTimeValue: appInstance.content.settings.initialTimeValue,
    direction: appInstance.content.settings.direction,
    timerVisible: appInstance.content.settings.timerVisible,
    startImmediately: appInstance.content.settings.startImmediately,
    tool,
    userId,
    timeResource: appInstanceResources.content.find(
      ({ user, type }) =>
        user === userId && type === APP_INSTANCE_RESOURCE_TIME,
    ),
  };
};

const mapDispatchToProps = {
  dispatchPostAppInstanceResource: postAppInstanceResource,
  dispatchPatchAppInstanceResource: patchAppInstanceResource,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentView);

const TranslatedComponent = withTranslation()(ConnectedComponent);

export default TranslatedComponent;
