// Core
import React from 'react';

// Material
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

// Models
import { UserDto } from '@iwdf/dto';

// Types
import { PostFormData } from '../../../types';

// Ui
import PostForm from './post-form';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '350px',
  },
}));

export interface DialogFormPostProps {
  handlerPostSubmit: (data: PostFormData) => void;
  isDisabled: boolean;
  isLoading: boolean;
  open: boolean;
  user: UserDto;
}

const DialogFormPost = ({
  handlerPostSubmit,
  isDisabled,
  isLoading,
  open,
  user,
}: DialogFormPostProps) => {
  const classes = useStyles();
  const onPostSubmit = (data: PostFormData) => {
    handlerPostSubmit(data);
  };

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="dialog-form-post-title"
        aria-describedby="dialog-form-post-description"
      >
        <DialogTitle id="dialog-form-post-title">
          What's up {user.username}?
        </DialogTitle>
        <DialogContent>
          <PostForm
            onSubmit={onPostSubmit}
            isDisabled={isDisabled}
            isLoading={isLoading}
            user={user}
          ></PostForm>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogFormPost;
