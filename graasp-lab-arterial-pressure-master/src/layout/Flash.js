import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const Flash = ({ t }) => (
  <div className="Flash-content">
    <p>
      {t('Phase explanation')}
    </p>
  </div>
);

Flash.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation('translations')(Flash);
