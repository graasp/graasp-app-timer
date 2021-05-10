import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const ConfirmDialog = props => {
  const {
    open,
    handleClose,
    handleConfirm,
    title,
    text,
    confirmText,
    cancelText,
    confirmTextId,
  } = props;
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            color="primary"
            autoFocus
          >
            {cancelText}
          </Button>
          <Button id={confirmTextId} onClick={handleConfirm} color="primary">
            {confirmText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmTextId: PropTypes.string,
};

ConfirmDialog.defaultProps = {
  text: '',
  confirmText: 'OK',
  confirmTextId: null,
  cancelText: 'Cancel',
};

export default ConfirmDialog;
