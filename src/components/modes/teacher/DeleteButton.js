import React, { useState } from 'react';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import ConfirmDialog from '../../common/ConfirmDialog';
import { deleteAppInstanceResource } from '../../../actions';
import {
  buildConfirmDialogConfirmButtonId,
  buildDeleteButtonId,
} from '../../../constants/selectors';

const DeleteButton = ({ disabled, id }) => {
  const { t } = useTranslation();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const dispatch = useDispatch();

  const handleToggleOpen = open => {
    setConfirmDialogOpen(open);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteAppInstanceResource(id));
    handleToggleOpen(false);
  };

  return (
    <>
      <IconButton
        id={buildDeleteButtonId(id)}
        color="primary"
        onClick={() => handleToggleOpen(true)}
        disabled={disabled}
      >
        <DeleteIcon />
      </IconButton>

      <ConfirmDialog
        open={confirmDialogOpen}
        title={t('Delete Time')}
        text={t(
          "By clicking 'Delete', you will be deleting student's time. This action cannot be undone.",
        )}
        handleClose={() => handleToggleOpen(false)}
        handleConfirm={handleConfirmDelete}
        confirmText={t('Delete')}
        cancelText={t('Cancel')}
        confirmTextId={buildConfirmDialogConfirmButtonId(id)}
      />
    </>
  );
};

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

DeleteButton.defaultProps = {
  disabled: false,
};

export default DeleteButton;
