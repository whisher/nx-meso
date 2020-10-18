// Core
import React, { FormEvent, useState } from 'react';

// Material
import TextField from '@material-ui/core/TextField';

// Material Theme
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

// Types
import { CommentFormData } from '../../../types';

// Custom Hooks
import { useForm } from '../../../shared/hooks';

// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
  })
);

export interface CommentFormProps {
  onSubmit: (data: Partial<CommentFormData>) => void;
}

const CommentPostForm = ({ onSubmit }: CommentFormProps) => {
  const classes = useStyles();
  const initialState: Partial<CommentFormData> = {
    text: '',
  };
  const { state, bind } = useForm(initialState);

  const { text } = state;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(state);
  };

  return (
    <form
      className={classes.root}
      onSubmit={submitHandler}
      noValidate
      autoComplete="off"
    >
      <TextField
        name="text"
        value={text}
        {...bind}
        id="comment-post"
        label="Your comment"
        placeholder="Your comment"
        fullWidth={true}
      />
    </form>
  );
};

export default CommentPostForm;
