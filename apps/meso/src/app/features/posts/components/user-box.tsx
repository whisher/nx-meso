// Core
import React from 'react';

// Material
import Avatar from '@material-ui/core/Avatar';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Models
import { UserDto } from '@iwdf/dto';

export interface UsersBoxProps {
  user: UserDto;
}

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
const UserBox = ({ user }: UsersBoxProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar alt={user.avatar} src={user.avatar} />
      <h3>{user.username}</h3>
    </div>
  );
};

export default UserBox;
