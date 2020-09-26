// Core
import React from 'react';

// Material
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// Models
import {PostDto } from '@iwdf/dto';

export interface DialogConfirmProps {
  children: React.ReactNode;
  handleConfirm: (post:PostDto) => void;
  open: boolean;
  post:PostDto
}

const DialogConfirm = ({
  children,
  handleConfirm,
  open,
  post
}: DialogConfirmProps) => {
  const handleClose = (post:PostDto | null) => {
    handleConfirm(post);
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
        <Button onClick={() => handleClose(null)} color="primary">
          No
        </Button>
        <Button onClick={() => handleClose(post)} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirm;
