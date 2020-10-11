// Core
import React, {  FormEvent, useState } from 'react';

// Material
import TextField from '@material-ui/core/TextField';

// Material Theme
import {createStyles, makeStyles, Theme } from '@material-ui/core/styles';



// Custom Hooks
import { useForm } from '../../../shared/hooks';


// Styles
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    }
  }),
);

export interface CommentPostFormProps {
  
}

const CommentPostForm = ({  }: CommentPostFormProps) => {
  const classes = useStyles();
  const initialState = {
    text: '',
    image: null,
  };
  const { state, bind } = useForm(initialState);

  const { text } = state;

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    //onSubmit(state);
  };

  

  

  return (
   
      <form className={classes.root} onSubmit={submitHandler} noValidate autoComplete="off">
        <TextField
          id="comment-post"
          label="Your comment"
          placeholder="Your comment"
          multiline fullWidth={true}
        />
      </form>
    
  );
};

export default CommentPostForm;
