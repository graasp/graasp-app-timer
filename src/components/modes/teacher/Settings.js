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
import Tooltip from '@material-ui/core/Tooltip';
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
import {
  HEADER_VISIBILITY_SWITCH_ID,
  INITIAL_TIME_VALUE_TEXTFIELD_ID,
  START_TIMER_AUTOMATICALLY_SWITCH_ID,
  TIMER_VISIBILITY_SWITCH_ID,
  DIRECTION_BACKWARD_RADIO_ID,
  DIRECTION_FORWARD_RADIO_ID,
} from '../../../constants/selectors';

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
    const {
      initialTimeValue,
      direction,
      startImmediately,
      timerVisible,
    } = settings;
    const showError = false;
    return {
      initialTimeValue,
      direction,
      showError,
      startImmediately,
      timerVisible,
    };
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
      startImmediately: PropTypes.bool.isRequired,
      timerVisible: PropTypes.bool.isRequired,
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

  handleChangeTimerVisibility = () => {
    const { timerVisible } = this.state;
    this.setState({ timerVisible: !timerVisible }, () => {
      const { timerVisible: currentTimerVisible } = this.state;
      if (currentTimerVisible === false) {
        const settingsToChange = {
          timerVisible: false,
        };
        this.setState({ startImmediately: true });
        this.saveSettings(settingsToChange);
      }
    });
  };

  handleChangeDirection = event => {
    const {
      target: { value },
    } = event;
    this.setState({ direction: value });
  };

  handleChangeStartImmediately = () => {
    const { startImmediately } = this.state;
    this.setState({ startImmediately: !startImmediately });
  };

  handleClose = () => {
    const { dispatchCloseSettings } = this.props;
    const {
      initialTimeValue,
      direction,
      startImmediately,
      timerVisible,
    } = this.state;
    this.saveSettings({
      initialTimeValue,
      direction,
      startImmediately,
      timerVisible,
    });
    dispatchCloseSettings();
  };

  handleChangeInitialTimeValue = ({ target: { value } }) => {
    if (Number(value) < 0) {
      this.setState({
        showError: true,
        initialTimeValue: 0,
      });
    } else {
      const initialTimeValue = Number(value);
      let hours = Math.floor(initialTimeValue / 60);
      let minutes = initialTimeValue % 60;
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;

      const showTimeConversion = `${hours} hh : ${minutes} mm `;

      this.setState({
        initialTimeValue,
        showTimeConversion,
        showError: false,
      });
    }
  };

  renderModalContent() {
    const { t, settings, activity, classes } = this.props;
    const { headerVisible } = settings;
    const {
      initialTimeValue,
      direction,
      showError,
      showTimeConversion,
      startImmediately,
      timerVisible,
    } = this.state;

    if (activity) {
      return <Loader />;
    }

    const switchControl = ({ id, checked, onChange, value }) => (
      <Switch
        id={id}
        color="primary"
        checked={checked}
        onChange={onChange}
        value={value}
      />
    );

    return (
      <>
        <FormControlLabel
          className={classes.formControl}
          disabled={!timerVisible}
          control={switchControl({
            id: HEADER_VISIBILITY_SWITCH_ID,
            checked: headerVisible,
            onChange: this.handleChangeHeaderVisibility,
            value: 'headerVisibility',
          })}
          label={t('Show Header to Students')}
        />
        <Tooltip
          title={t(
            'You can add and time student activities without displaying the timer.',
          )}
        >
          <FormControlLabel
            className={classes.formControl}
            checked={timerVisible}
            control={switchControl({
              id: TIMER_VISIBILITY_SWITCH_ID,
              checked: timerVisible,
              onChange: this.handleChangeTimerVisibility,
              value: 'timerVisibility',
            })}
            label={t('Show/Hide Timer')}
          />
        </Tooltip>
        <Tooltip
          title={t('The controls are hidden when timer starts automatically')}
        >
          <FormControlLabel
            className={classes.formControl}
            disabled={!timerVisible}
            control={switchControl({
              id: START_TIMER_AUTOMATICALLY_SWITCH_ID,
              checked: startImmediately,
              onChange: this.handleChangeStartImmediately,
              value: 'startImmediately',
            })}
            label={t('Start Timer Automatically')}
          />
        </Tooltip>
        <TextField
          type="Number"
          value={initialTimeValue}
          id={INITIAL_TIME_VALUE_TEXTFIELD_ID}
          onChange={this.handleChangeInitialTimeValue}
          label={t('Set counter start time')}
          className={clsx(classes.margin, classes.textField)}
          error={showError}
          helperText={showTimeConversion}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{t('Minutes')}</InputAdornment>
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
              id={DIRECTION_BACKWARD_RADIO_ID}
              value={BACKWARD_DIRECTION}
              control={<Radio color="primary" />}
              label={t('Count Down')}
            />
            <FormControlLabel
              id={DIRECTION_FORWARD_RADIO_ID}
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

const mapStateToProps = ({ layout, appInstance }) => ({
  open: layout.settings.open,
  settings: appInstance.content.settings,
  activity: Boolean(appInstance.activity.length),
});

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
