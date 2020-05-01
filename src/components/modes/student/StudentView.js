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
} from '../../../config/settings';

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
  const { t, initialTimeValue, direction, tool } = props;
  const classes = useStyles();
  const ONE_HOUR_IN_MINS = 60;
  const ONE_MINUTE_IN_MILLIS = 60000;

  return (
    <div>
      <Timer
        initialTime={initialTimeValue * ONE_MINUTE_IN_MILLIS}
        startImmediately
        direction={direction}
      >
        {({ start, pause, reset }) => (
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
                <IconButton aria-label="Start" color="primary" onClick={start}>
                  <PlayArrowIcon />
                </IconButton>
                <IconButton aria-label="pause" color="primary" onClick={pause}>
                  <PauseIcon />
                </IconButton>
                <IconButton aria-label="Repeat" color="primary" onClick={reset}>
                  <ReplayIcon />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        )}
      </Timer>
    </div>
  );
};

StudentView.propTypes = {
  t: PropTypes.func.isRequired,
  initialTimeValue: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([BACKWARD_DIRECTION, FORWARD_DIRECTION])
    .isRequired,
  tool: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ appInstance, context }) => ({
  initialTimeValue: appInstance.content.settings.initialTimeValue,
  direction: appInstance.content.settings.direction,
  tool: context.tool,
});

const ConnectedComponent = connect(mapStateToProps)(StudentView);

const TranslatedComponent = withTranslation()(ConnectedComponent);

export default TranslatedComponent;
