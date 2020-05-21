import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Timer from 'react-compound-timer';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReplayIcon from '@material-ui/icons/Replay';
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
import { TIME } from '../../../config/appInstanceResourceTypes';

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
    timeControlsVisible,
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
        {({ start, pause, reset, getTime }) => {
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
                type: TIME,
              });
            }
          }
          return (
            <div className={classes.root}>
              <Grid className={classes.gridRow} container spacing={3}>
                <Grid item xs place-content="center">
                  <Grid
                    className={classes.gridRow}
                    container
                    spacing={3}
                    direction={tool ? 'column' : 'row'}
                    alignItems="center"
                  >
                    {initialTimeValue >= ONE_HOUR_IN_MINS && (
                      <Counter
                        timeValue={<Timer.Hours />}
                        timeUnit={t('Hours')}
                      />
                    )}
                    <Counter
                      timeValue={<Timer.Minutes />}
                      timeUnit={t('Minutes')}
                    />
                    <Counter
                      timeValue={<Timer.Seconds />}
                      timeUnit={t('Seconds')}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} align="center">
                  {(timeControlsVisible || !startImmediately) && (
                    <IconButton
                      aria-label="Start"
                      color="primary"
                      onClick={() => {
                        start();
                        handleStart();
                      }}
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  )}
                  {timeControlsVisible && (
                    <IconButton
                      aria-label="pause"
                      color="primary"
                      onClick={pause}
                    >
                      <PauseIcon />
                    </IconButton>
                  )}
                  {timeControlsVisible && (
                    <IconButton
                      aria-label="Repeat"
                      color="primary"
                      onClick={reset}
                    >
                      <ReplayIcon />
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
  timeControlsVisible: PropTypes.bool.isRequired,
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
    timeControlsVisible: appInstance.content.settings.timeControlsVisible,
    startImmediately: appInstance.content.settings.startImmediately,
    tool,
    userId,
    timeResource: appInstanceResources.content.find(({ user, type }) => {
      return user === userId && type === TIME;
    }),
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
