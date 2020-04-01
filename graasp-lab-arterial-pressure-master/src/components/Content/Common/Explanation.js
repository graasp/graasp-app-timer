import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Col } from 'reactstrap';

const Explanation = ({
  showNerve,
  t,
}) => (
  <div className="control-container">
    <Col xs={12} className="px-0">
      { showNerve ? (
        <div className="explanation-content">
          <p>
            {t('Phase explanation')}
          </p>
        </div>
      ) : ''
      }
    </Col>
  </div>
);

Explanation.propTypes = {
  t: PropTypes.func.isRequired,
  showNerve: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  showNerve: state.layout.showNerve,
});

const ConnectedComponent = connect(mapStateToProps)(Explanation);

export default withTranslation()(ConnectedComponent);
