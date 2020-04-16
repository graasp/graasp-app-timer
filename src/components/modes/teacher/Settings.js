import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import { closeSettings, patchAppInstance } from '../../../actions';
import Loader from '../../common/Loader';

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
  button: {
    margin: theme.spacing(),
  },
});

const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    borderColor: theme.palette.primary.main,
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
  },
  checked: {},
}))(Switch);

class Settings extends Component {
  state = (() => {
    const { settings } = this.props;
    const {
      initialTimeValue,
      countTimeBackwards,
      verticalOrientation,
    } = settings;
    return { initialTimeValue, countTimeBackwards, verticalOrientation };
  })();

  static propTypes = {
    classes: PropTypes.shape({
      paper: PropTypes.string,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    activity: PropTypes.bool.isRequired,
    settings: PropTypes.shape({
      headerVisible: PropTypes.bool.isRequired,
      initialTimeValue: PropTypes.number.isRequired,
      countTimeBackwards: PropTypes.bool.isRequired,
      verticalOrientation: PropTypes.bool.isRequired,
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

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleClose = () => {
    const { dispatchCloseSettings } = this.props;
    const {
      initialTimeValue,
      countTimeBackwards,
      verticalOrientation,
    } = this.state;
    this.saveSettings({
      initialTimeValue,
      countTimeBackwards,
      verticalOrientation,
    });
    dispatchCloseSettings();
  };

  renderModalContent() {
    const { t, settings, activity } = this.props;
    const { headerVisible } = settings;
    const {
      initialTimeValue,
      countTimeBackwards,
      verticalOrientation,
    } = this.state;

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
          control={switchControl}
          label={t('Show Header to Students')}
        />
        <TextField
          type="Number"
          value={initialTimeValue}
          onChange={({ target: { value } }) =>
            this.setState({ initialTimeValue: Number(value) })}
          label={t('Set counter start time (in seconds)')}
          fullWidth
        />
        <Typography component="div">
          <Box lineHeight={4}>
            <Grid component="label" container alignItems="center" spacing={1}>
              Timer Type:
              <Grid item>{t('Count Up')}</Grid>
              <Grid item>
                <AntSwitch
                  checked={countTimeBackwards}
                  onChange={this.handleChange}
                  name="countTimeBackwards"
                />
              </Grid>
              <Grid item>{t('Count Down')}</Grid>
            </Grid>
          </Box>
        </Typography>
        <Typography component="div">
          <Grid component="label" container alignItems="center" spacing={1}>
            Orientation:
            <Grid item>{t('Horizontal')}</Grid>
            <Grid item>
              <AntSwitch
                checked={verticalOrientation}
                onChange={this.handleChange}
                name="verticalOrientation"
              />
            </Grid>
            <Grid item>{t('Vertical')}</Grid>
          </Grid>
        </Typography>
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
