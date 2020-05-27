import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StudentView from './StudentView';
import { DEFAULT_VIEW, FEEDBACK_VIEW } from '../../../config/views';
import { getAppInstanceResources } from '../../../actions';

class StudentMode extends Component {
  static propTypes = {
    appInstanceId: PropTypes.string,
    view: PropTypes.string,
    dispatchGetAppInstanceResources: PropTypes.func.isRequired,
    userId: PropTypes.string,
  };

  static defaultProps = {
    view: 'normal',
    appInstanceId: null,
    userId: null,
  };

  state = { started: false };

  componentDidMount() {
    const { userId, dispatchGetAppInstanceResources } = this.props;

    // get the resources for this user
    dispatchGetAppInstanceResources({ userId });
  }

  componentDidUpdate({ appInstanceId: prevAppInstanceId, userId: prevUserId }) {
    const {
      appInstanceId,
      dispatchGetAppInstanceResources,
      userId,
    } = this.props;
    // handle receiving the app instance id
    if (appInstanceId !== prevAppInstanceId || userId !== prevUserId) {
      dispatchGetAppInstanceResources({ userId });
    }
  }

  toggleStarted = () => {
    const { started } = this.state;
    this.setState({ started: !started });
  };

  render() {
    const { view } = this.props;
    const { started } = this.state;

    switch (view) {
      case FEEDBACK_VIEW:
      case DEFAULT_VIEW:
      default:
        return (
          <StudentView handleStart={this.toggleStarted} started={started} />
        );
    }
  }
}
const mapStateToProps = ({ context }) => {
  const { userId, appInstanceId } = context;
  return {
    userId,
    appInstanceId,
  };
};

const mapDispatchToProps = {
  dispatchGetAppInstanceResources: getAppInstanceResources,
};

const ConnectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentMode);

export default ConnectedComponent;
