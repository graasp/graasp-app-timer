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
    activity: PropTypes.number,
    dispatchGetAppInstanceResources: PropTypes.func.isRequired,
    userId: PropTypes.string,
  };

  static defaultProps = {
    view: 'normal',
    appInstanceId: null,
    activity: 0,
    userId: null,
  };

  constructor(props) {
    super(props);
    const { userId } = props;

    // get the resources for this user
    props.dispatchGetAppInstanceResources({ userId });
  }

  componentDidUpdate({ appInstanceId: prevAppInstanceId }) {
    const {
      appInstanceId,
      dispatchGetAppInstanceResources,
      userId,
    } = this.props;
    // handle receiving the app instance id
    if (appInstanceId !== prevAppInstanceId) {
      dispatchGetAppInstanceResources({ userId });
    }
  }

  render() {
    const { view, activity } = this.props;
    if (activity) {
      return <Loader />;
    }
    switch (view) {
      case FEEDBACK_VIEW:
      case DEFAULT_VIEW:
      default:
        return <StudentView orientation="horizontal" />;
    }
  }
}
const mapStateToProps = ({ context, appInstanceResources }) => {
  const { userId, appInstanceId } = context;
  return {
    userId,
    appInstanceId,
    activity: appInstanceResources.activity.length,
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
