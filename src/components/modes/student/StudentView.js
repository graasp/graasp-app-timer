import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import Timer from 'react-compound-timer';
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
import Counter from './Counter';

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
            <Grid className={classes.gridRow} container spacing={3}>
              <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Choose Timer Type</FormLabel>
                  <RadioGroup
                    aria-label="selectTimerType"
                    name="selectTimerType"
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
                  className={classes.gridRow}
                  container
                  spacing={3}
                  direction={direction}
                  alignItems="center"
                >
                  <Counter timeValue={<Timer.Days />} timeUnit={t('days')} />
                  <Counter timeValue={<Timer.Hours />} timeUnit="hours" />
                  <Counter timeValue={<Timer.Minutes />} timeUnit="minutes" />
                  <Counter timeValue={<Timer.Seconds />} timeUnit="seconds" />
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

StudentView.defaultProps = {
  orientation: 'horizontal',
};

StudentView.propTypes = {
  t: PropTypes.func.isRequired,
  orientation: PropTypes.string,
};

export default withTranslation()(StudentView);
