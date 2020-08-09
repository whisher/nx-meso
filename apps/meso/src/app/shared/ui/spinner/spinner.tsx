import React, { ReactNode } from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(3),
  },
}));

export interface SpinnerProps {
  size?: number | string;
  thickness?: number;
}
const IwdfSpinner = ({ size = 50, thickness = 4 }: SpinnerProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={size} thickness={thickness} />
    </div>
  );
};

export default IwdfSpinner;
