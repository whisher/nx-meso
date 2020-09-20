import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

export interface DialogConfirmProps {
  children: React.ReactNode;
  handleConfirm: (flag: boolean) => void;
  open: boolean;
}

const DialogConfirm = ({
  children,
  handleConfirm,
  open,
}: DialogConfirmProps) => {
  const handleClose = (flag: boolean) => {
    handleConfirm(flag);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-confirm-title"
      aria-describedby="dialog-confirm-description"
    >
      <DialogTitle id="dialog-confirm-title">{children}</DialogTitle>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          No
        </Button>
        <Button onClick={() => handleClose(true)} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
