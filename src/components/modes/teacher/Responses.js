import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Delete as DeleteIcon } from '@material-ui/icons';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ConfirmDialog from '../../common/ConfirmDialog';
import { deleteAppInstanceResource } from '../../../actions';

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

  state = {
    confirmDialogOpen: false,
  };

  static propTypes = {
    t: PropTypes.func.isRequired,
    dispatchDeleteAppInstanceResource: PropTypes.func.isRequired,
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

  handleToggleConfirmDialog = open => () => {
    this.setState({
      confirmDialogOpen: open,
    });
  };

  handleConfirmDelete = id => {
    const { dispatchDeleteAppInstanceResource } = this.props;
    dispatchDeleteAppInstanceResource(id);
    this.handleToggleConfirmDialog(false)();
  };

  milliToHMS = duration => {
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
    const { confirmDialogOpen } = this.state;

    const usersTimeData = appInstanceResources.map(({ user, data, _id }) => ({
      userId: user,
      time: data,
      appInstanceId: _id,
    }));

    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>{t('Student')}</TableCell>
                <TableCell>{t('Current Time')}</TableCell>
                <TableCell align="center">{t('Actions')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersTimeData.map((row, index) => (
                <TableRow key={String(index)}>
                  <TableCell align="left">
                    {userContent.length &&
                      userContent.find(({ id }) => id === row.userId).name}
                  </TableCell>
                  <TableCell align="left">
                    {this.milliToHMS(row.time)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={this.handleToggleConfirmDialog(true)}
                      disabled={_.isEmpty(userContent)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <ConfirmDialog
                      open={confirmDialogOpen}
                      title={t('Delete Time')}
                      text={t(
                        "By clicking 'Delete', you will be deleting students' time. This action cannot be undone.",
                      )}
                      handleClose={this.handleToggleConfirmDialog(false)}
                      handleConfirm={() => this.handleConfirmDelete(row.appInstanceId)}
                      confirmText={t('Delete')}
                      cancelText={t('Cancel')}
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

const mapStateToProps = ({ appInstance, appInstanceResources, users }) => {
  return {
    settings: appInstance.content.settings,
    appInstanceResources: appInstanceResources.content,
    userContent: users.content,
  };
};

const mapDispatchToProps = {
  dispatchDeleteAppInstanceResource: deleteAppInstanceResource,
};

const StyledComponent = withStyles(Responses.styles)(Responses);

const TranslatedComponent = withTranslation()(StyledComponent);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TranslatedComponent);
