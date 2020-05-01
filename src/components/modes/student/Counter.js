import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({
  gridRow: {
    width: '100%',
  },
}));

const Counter = ({ timeValue, timeUnit }) => {
  const classes = useStyles();
  return (
    <Grid item xs className={classes.gridRow}>
      <Paper variant="outlined" align="center">
        <Typography variant="h1" color="primary">
          {timeValue}
        </Typography>
        {' '}
        {timeUnit}
      </Paper>
    </Grid>
  );
};

Counter.propTypes = {
  timeValue: PropTypes.element.isRequired,
  timeUnit: PropTypes.string.isRequired,
};

export default Counter;
