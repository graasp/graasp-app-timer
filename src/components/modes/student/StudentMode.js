import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StudentView from './StudentView';
import { DEFAULT_VIEW, FEEDBACK_VIEW } from '../../../config/views';
import { getAppInstanceResources } from '../../../actions';
import Loader from '../../common/Loader';

class StudentMode extends Component {
  static propTypes = {
    appInstanceId: PropTypes.string,
    view: PropTypes.string,
    dispatchGetAppInstanceResources: PropTypes.func.isRequired,
    userId: PropTypes.string,
    ready: PropTypes.bool.isRequired,
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

  render() {
    const { view, ready } = this.props;
    const { started } = this.state;

    if (!ready) {
      return <Loader />;
    }

    switch (view) {
      case FEEDBACK_VIEW:
      case DEFAULT_VIEW:
      default:
        return (
          <StudentView
            handleStart={() => this.setState({ started: true })}
            started={started}
          />
        );
    }
  }
}
const mapStateToProps = ({ context, appInstanceResources }) => {
  const { userId, appInstanceId } = context;
  return {
    userId,
    appInstanceId,
    ready: appInstanceResources.ready,
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
