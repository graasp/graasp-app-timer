import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  buildResponseTableRowId,
  RESPONSES_TABLE_ID,
} from '../../../constants/selectors';
import DeleteButton from './DeleteButton';

class Responses extends Component {
  static styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

  static propTypes = {
    t: PropTypes.func.isRequired,
    userContent: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    ).isRequired,
    appInstanceResources: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.number,
        user: PropTypes.string,
        _id: PropTypes.number,
      }),
    ).isRequired,
    classes: PropTypes.shape({
      root: PropTypes.string,
      table: PropTypes.string,
    }).isRequired,
  };

  // takes millis and outputs hh:mm:ss
  formatTime = duration => {
    let seconds = parseInt((duration / 1000) % 60, 10);
    let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
    let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours} : ${minutes} : ${seconds}`;
  };

  render() {
    const {
      // this property allows us to do styling and is injected by withStyles
      classes,
      // this property allows us to do translations and is injected by i18next
      t,
      appInstanceResources,
      userContent,
    } = this.props;

    const usersTimeData = appInstanceResources.map(
      ({ user, data, _id, appInstance: appInstanceId }) => ({
        userId: user,
        time: data,
        appInstanceId,
        _id,
      }),
    );

    return (
      <div id={RESPONSES_TABLE_ID}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>{t('Student')}</TableCell>
                <TableCell>{t('Current Time (HH MM SS)')}</TableCell>
                <TableCell align="center">{t('Actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersTimeData.map((row, index) => (
                <TableRow
                  id={buildResponseTableRowId(row?._id)}
                  key={String(index)}
                >
                  <TableCell align="left">
                    {userContent?.find(({ id }) => id === row.userId)?.name ||
                      t('Unknown')}
                  </TableCell>
                  <TableCell align="left">
                    {this.formatTime(row.time)}
                  </TableCell>
                  <TableCell align="center">
                    <DeleteButton
                      id={row._id}
                      disabled={_.isEmpty(userContent)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ appInstance, appInstanceResources, users }) => ({
  settings: appInstance.content.settings,
  appInstanceResources: appInstanceResources.content,
  userContent: users.content,
});
const StyledComponent = withStyles(Responses.styles)(Responses);

const TranslatedComponent = withTranslation()(StyledComponent);

export default connect(mapStateToProps)(TranslatedComponent);
