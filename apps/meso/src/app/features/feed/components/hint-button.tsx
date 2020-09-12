// Core
import React from 'react';

// Material
import Button from '@material-ui/core/Button';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';

// Styles
const useStyles = makeStyles(() => ({
  root: {
    display: 'block',
    width: '100%',
  },
}));

export interface HintButtonProps {
  children: React.ReactNode;
  handlerOpenDialogFormPost: () => void;
}

const HintButton = ({
  children,
  handlerOpenDialogFormPost,
}: HintButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      className={classes.root}
      onClick={handlerOpenDialogFormPost}
      variant="contained"
      color="secondary"
    >
      {children}
    </Button>
  );
};

export default HintButton;
