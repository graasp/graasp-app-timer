import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import MenuIcon from '@material-ui/icons/Menu';
import Fab from '@material-ui/core/Fab';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Styles from './Styles';
import Flash from './Flash';
import ImageManager from '../components/Simulator/ImageManager';
import { AppState } from '../config/AppState';
import { toggleSideMenu, toggleNerve } from '../actions';


const styles = Styles;

class Main extends Component {
  state = AppState;

  handleToggleSideMenu = open => () => {
    const { dispatchToggleSideMenu } = this.props;
    dispatchToggleSideMenu(open);
  }

  notify = () => toast(<Flash />, { position: toast.POSITION.BOTTOM_LEFT });

  handleToggleNerveSection = showNerve => () => {
    const { dispatchToggleNerveSection } = this.props;
    dispatchToggleNerveSection(showNerve);
    this.notify();
  }

  render() {
    const {
      classes,
      showHeader,
      showSideMenu,
      showNerve,
      themeColor,
    } = this.props;

    return (
      <main
        className={classNames(classes.content, {
          [classes.contentShift]: showSideMenu,
        })}
      >
        { showHeader ? (
          <div className={classes.drawerHeader} />
        ) : ''
        }
        { showHeader ? ''
          : (
            <Fab
              color="primary"
              aria-label="Add"
              onClick={this.handleToggleSideMenu(!showSideMenu)}
              className={classes.fab}
              style={{ backgroundColor: themeColor, outline: 'none' }}
            >
              { showSideMenu ? <ChevronRightIcon /> : <MenuIcon style={{ color: 'white' }} /> }
            </Fab>
          )
        }

        <ImageManager
          showNerve={showNerve}
          handleToggleNerveSection={this.handleToggleNerveSection(!showNerve)}
        />
        { showNerve ? <ToastContainer autoClose={false} /> : ''}
      </main>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  themeColor: PropTypes.string.isRequired,
  showHeader: PropTypes.bool.isRequired,
  showSideMenu: PropTypes.bool.isRequired,
  showNerve: PropTypes.bool.isRequired,
  dispatchToggleSideMenu: PropTypes.func.isRequired,
  dispatchToggleNerveSection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  themeColor: state.layout.themeColor,
  showHeader: state.layout.showHeader,
  showSideMenu: state.layout.showSideMenu,
  showNerve: state.layout.showNerve,
});

const mapDispatchToProps = {
  dispatchToggleSideMenu: toggleSideMenu,
  dispatchToggleNerveSection: toggleNerve,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Main);

export default withStyles(styles, { withTheme: true })(connectedComponent);
