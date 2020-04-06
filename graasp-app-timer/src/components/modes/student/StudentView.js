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


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

// const timerType = "backward"
// const startValue = timerType === "forward" ? 0 : 4800000

export const StudentView = ({ t }) => {
  const [value, setValue] = React.useState('forward');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const classes = useStyles();
  return (
    <div>
      <Timer
        initialTime={value === "forward" ? 0 : 4800000}
        startImmediately


        direction={value}
      >
        {({ start, pause, reset }) => (
          <div className={classes.root}>
            <Grid container spacing={3} style={{width: "100%"}}>
              <Grid item xs={12} align="center">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Choose Timer Type</FormLabel>
                  <RadioGroup aria-label="selectTimerType" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="forward" control={<Radio />} label="Count Up" onClick={() => setValue("forward")} />
                    <FormControlLabel value="backward" control={<Radio />} label="Count Down " onClick={() => setValue("backward")} />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3} style={{width: "100%"}}>
                  <Grid item xs={3}>
                    <Paper variant="outlined" align="center">
                      <Typography variant="h1" color="primary">
                        <Timer.Days />
                      </Typography>
                      {' '}
                      {t('days')}
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper variant="outlined" align="center">
                      <Typography variant="h1" color="primary">
                        <Timer.Hours />
                      </Typography>
                      {' '}
                      hours
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper variant="outlined" align="center">
                      <Typography variant="h1" color="primary"> 
                        <Timer.Minutes />
                      </Typography>
                      {' '}
                      minutes
                    </Paper>
                  </Grid>
                  <Grid item xs={3}>
                    <Paper variant="outlined" align="center">
                      <Typography variant="h1" color="primary">
                        <Timer.Seconds />
                      </Typography>
                      {' '}
                      seconds
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} align="center">
                <IconButton aria-label="Start" color="primary" onClick={start}>
                  <PlayArrowIcon />
                </IconButton>
                <IconButton aria-label="pause" color="primary" onClick={pause}>
                  <PauseIcon />
                </IconButton>
                {/* <IconButton aria-label="Stop" color="primary" onClick={stop}>
              <StopIcon />
            </IconButton> */}
                <IconButton aria-label="Repeat" color="primary" onClick={reset}>
                  <ReplayIcon />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        )}
      </Timer>


    </div>
  )
};

StudentView.propTypes = {
  t: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    main: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

export default withTranslation()(StudentView);
