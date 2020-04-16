import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import StudentMode from './modes/student/StudentMode';
import { getContext } from '../actions';
import { DEFAULT_LANG, DEFAULT_MODE } from '../config/settings';
import { DEFAULT_VIEW } from '../config/views';
import { getAppInstance } from '../actions/appInstance';
import TeacherMode from './modes/teacher/TeacherMode';
import Header from './layout/Header';
import Loader from './common/Loader';

export class App extends Component {
  static propTypes = {
    i18n: PropTypes.shape({
      defaultNS: PropTypes.string,
      changeLanguage: PropTypes.func,
    }).isRequired,
    dispatchGetContext: PropTypes.func.isRequired,
    dispatchGetAppInstance: PropTypes.func.isRequired,
    appInstanceId: PropTypes.string,
    lang: PropTypes.string,
    mode: PropTypes.string,
    view: PropTypes.string,
    headerVisible: PropTypes.bool.isRequired,
    initialTimeValue: PropTypes.number.isRequired,
    countTimeBackwards: PropTypes.bool.isRequired,
    verticalOrientation: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
    standalone: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    lang: DEFAULT_LANG,
    mode: DEFAULT_MODE,
    view: DEFAULT_VIEW,
    appInstanceId: null,
  };

  constructor(props) {
    super(props);
    // first thing to do is get the context
    props.dispatchGetContext();
    // then get the app instance
    props.dispatchGetAppInstance();
  }

  componentDidMount() {
    const { lang } = this.props;
    // set the language on first load
    this.handleChangeLang(lang);
  }

  componentDidUpdate({ lang: prevLang, appInstanceId: prevAppInstanceId }) {
    const { lang, appInstanceId, dispatchGetAppInstance } = this.props;
    // handle a change of language
    if (lang !== prevLang) {
      this.handleChangeLang(lang);
    }
    // handle receiving the app instance id
    if (appInstanceId !== prevAppInstanceId) {
      dispatchGetAppInstance();
    }
  }

  handleChangeLang = lang => {
    const { i18n } = this.props;
    i18n.changeLanguage(lang);
  };

  render() {
    const {
      mode,
      view,
      headerVisible,
      ready,
      standalone,
      initialTimeValue,
      countTimeBackwards,
      verticalOrientation,
    } = this.props;

    if (!ready) {
      return <Loader />;
    }

    switch (mode) {
      // show teacher view when in producer (educator) mode
      case 'teacher':
      case 'producer':
      case 'educator':
      case 'admin':
        return (
          <>
            <Header />
            <TeacherMode view={view} />
          </>
        );

      // by default go with the consumer (learner) mode
      case 'student':
      case 'consumer':
      case 'learner':
      default:
        return (
          <>
            {headerVisible || standalone ? <Header /> : null}
            <StudentMode
              initialTimeValue={initialTimeValue}
              countTimeBackwards={countTimeBackwards}
              verticalOrientation={verticalOrientation}
            />
          </>
        );
    }
  }
}

const mapStateToProps = ({ context, appInstance }) => ({
  headerVisible: appInstance.content.settings.headerVisible,
  initialTimeValue: appInstance.content.settings.initialTimeValue,
  countTimeBackwards: appInstance.content.settings.countTimeBackwards,
  verticalOrientation: appInstance.content.settings.verticalOrientation,
  lang: context.lang,
  mode: context.mode,
  view: context.view,
  appInstanceId: context.appInstanceId,
  ready: appInstance.ready,
  standalone: context.standalone,
});

const mapDispatchToProps = {
  dispatchGetContext: getContext,
  dispatchGetAppInstance: getAppInstance,
};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default withTranslation()(ConnectedApp);
