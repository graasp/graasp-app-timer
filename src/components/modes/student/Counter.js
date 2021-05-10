import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { COUNTER_NUMBER_CLASS } from '../../../constants/selectors';

const useStyles = makeStyles(() => ({
  gridRow: {
    width: '100%',
  },
}));

const Counter = ({ timeValue, timeUnit, id }) => {
  const classes = useStyles();
  return (
    <Grid item xs className={classes.gridRow}>
      <Paper id={id} variant="outlined" align="center">
        <Typography
          variant="h1"
          color="primary"
          className={COUNTER_NUMBER_CLASS}
        >
          {timeValue}
        </Typography>
        {timeUnit}
      </Paper>
    </Grid>
  );
};

Counter.propTypes = {
  id: PropTypes.string,
  timeValue: PropTypes.element.isRequired,
  timeUnit: PropTypes.string.isRequired,
};

Counter.defaultProps = {
  id: null,
};

export default Counter;
