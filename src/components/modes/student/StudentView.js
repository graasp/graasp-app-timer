import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Timer from 'react-compound-timer';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ReplayIcon from '@material-ui/icons/Replay';
import PauseIcon from '@material-ui/icons/Pause';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const GridItem = ({ timeValue, timeUnit }) => (
  <Grid item xs={3} style={{ width: '100%' }}>
    <Paper variant="outlined" align="center">
      <Typography variant="h1" color="primary">
        {timeValue}
      </Typography>
      {' '}
      {timeUnit}
    </Paper>
  </Grid>
);

export const StudentView = ({ t, orientation }) => {
  const [value, setValue] = React.useState('forward');

  const handleChange = event => {
    setValue(event.target.value);
  };
  const classes = useStyles();
  const direction = orientation === 'vertical' ? 'column' : 'row';
  return (
    <div>
      <Timer
        initialTime={value === 'forward' ? 0 : 4800000}
        startImmediately
        direction={value}
      >
        {({ start, pause, reset }) => (
          <div className={classes.root}>
            <Grid container spacing={3} style={{ width: '100%' }}>
              <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Choose Timer Type</FormLabel>
                  <RadioGroup
                    aria-label="selectTimerType"
                    name="gender1"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="forward"
                      control={<Radio />}
                      label="Count Up"
                      onClick={() => setValue('forward')}
                    />
                    <FormControlLabel
                      value="backward"
                      control={<Radio />}
                      label="Count Down "
                      onClick={() => setValue('backward')}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  spacing={3}
                  style={{ width: '100%' }}
                  direction={direction}
                  alignItems="center"
                >
                  <GridItem timeValue={<Timer.Days />} timeUnit={t('days')} />
                  <GridItem timeValue={<Timer.Hours />} timeUnit="hours" />
                  <GridItem timeValue={<Timer.Minutes />} timeUnit="minutes" />
                  <GridItem timeValue={<Timer.Seconds />} timeUnit="seconds" />
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

GridItem.propTypes = {
  timeValue: PropTypes.func.isRequired,
  timeUnit: PropTypes.string.isRequired,
};

StudentView.defaultProps = {
  orientation: 'horizontal',
};

StudentView.propTypes = {
  t: PropTypes.func.isRequired,
  orientation: PropTypes.string,
  classes: PropTypes.shape({
    main: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

export default withTranslation()(StudentView);
