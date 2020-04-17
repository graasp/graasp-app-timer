import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Modal from '@material-ui/core/Modal';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import clsx from 'clsx';
import InputAdornment from '@material-ui/core/InputAdornment';
import { closeSettings, patchAppInstance } from '../../../actions';
import Loader from '../../common/Loader';
import {
  BACKWARD_DIRECTION,
  FORWARD_DIRECTION,
} from '../../../config/settings';

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none',
  },
  formControl: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginTop: theme.spacing(3),
  },
});

class Settings extends Component {
  state = (() => {
    const { settings } = this.props;
    const { initialTimeValue, direction } = settings;
    return { initialTimeValue, direction };
  })();

  static propTypes = {
    classes: PropTypes.shape({
      paper: PropTypes.string,
      formControl: PropTypes.string,
      textField: PropTypes.string,
      margin: PropTypes.number,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    activity: PropTypes.bool.isRequired,
    settings: PropTypes.shape({
      headerVisible: PropTypes.bool.isRequired,
      initialTimeValue: PropTypes.number.isRequired,
      direction: PropTypes.oneOf([BACKWARD_DIRECTION, FORWARD_DIRECTION]),
    }).isRequired,
    t: PropTypes.func.isRequired,
    dispatchCloseSettings: PropTypes.func.isRequired,
    dispatchPatchAppInstance: PropTypes.func.isRequired,
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
    }).isRequired,
  };

  saveSettings = settingsToChange => {
    const { settings, dispatchPatchAppInstance } = this.props;
    const newSettings = {
      ...settings,
      ...settingsToChange,
    };
    dispatchPatchAppInstance({
      data: newSettings,
    });
  };

  handleChangeHeaderVisibility = () => {
    const {
      settings: { headerVisible },
    } = this.props;
    const settingsToChange = {
      headerVisible: !headerVisible,
    };
    this.saveSettings(settingsToChange);
  };

  handleChangeDirection = event => {
    const {
      target: { value },
    } = event;
    this.setState({ direction: value });
  };

  handleClose = () => {
    const { dispatchCloseSettings } = this.props;
    const { initialTimeValue, direction } = this.state;
    this.saveSettings({
      initialTimeValue,
      direction,
    });
    dispatchCloseSettings();
  };

  handleChangeInitialTimeValue = ({ target: { value } }) => {
    this.setState({
      initialTimeValue: Number(value),
    });
  };

  renderModalContent() {
    const { t, settings, activity, classes } = this.props;
    const { headerVisible } = settings;
    const { initialTimeValue, direction } = this.state;

    if (activity) {
      return <Loader />;
    }

    const switchControl = (
      <Switch
        color="primary"
        checked={headerVisible}
        onChange={this.handleChangeHeaderVisibility}
        value="headerVisibility"
      />
    );

    return (
      <>
        <FormControlLabel
          className={classes.formControl}
          control={switchControl}
          label={t('Show Header to Students')}
        />
        <TextField
          type="Number"
          value={initialTimeValue}
          id="outlined-start-adornment"
          onChange={this.handleChangeInitialTimeValue}
          label={t('Set counter start time')}
          className={clsx(classes.margin, classes.textField)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">Minutes</InputAdornment>
            ),
          }}
          variant="outlined"
          fullWidth
        />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" htmlFor="direction">
            {t('Timer Type')}
          </FormLabel>
          <RadioGroup
            aria-label={t('direction')}
            name="direction"
            value={direction}
            onChange={this.handleChangeDirection}
          >
            <FormControlLabel
              value={BACKWARD_DIRECTION}
              control={<Radio color="primary" />}
              label={t('Count Down')}
            />
            <FormControlLabel
              value={FORWARD_DIRECTION}
              control={<Radio color="primary" />}
              label={t('Count Up')}
            />
          </RadioGroup>
        </FormControl>
      </>
    );
  }

  render() {
    const { open, classes, t } = this.props;
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h5" id="modal-title">
              {t('Settings')}
            </Typography>
            {this.renderModalContent()}
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({ layout, appInstance }) => {
  return {
    open: layout.settings.open,
    settings: appInstance.content.settings,
    activity: Boolean(appInstance.activity.length),
  };
};

const mapDispatchToProps = {
  dispatchCloseSettings: closeSettings,
  dispatchPatchAppInstance: patchAppInstance,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
const TranslatedComponent = withTranslation()(ConnectedComponent);

export default withStyles(styles)(TranslatedComponent);
