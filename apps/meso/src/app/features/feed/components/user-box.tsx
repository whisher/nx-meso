// Core
import React, { useState } from 'react';

// Material
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Env
import { environment } from '../../../../environments/environment';

// Models
import { UserDto } from '@iwdf/dto';

// Hooks
import { useAccount } from '../../../shared/hooks';

export interface UsersBoxProps {
  handlerFollow: (user: UserDto) => void;
  handlerUnFollow: (user: UserDto) => void;
  user: UserDto;
}

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));
const UserBox = ({ handlerFollow, handlerUnFollow, user }: UsersBoxProps) => {
  const classes = useStyles();
  const { data: currentUser } = useAccount();
  const [hover, sethover] = useState(false);
  const isFollowed = () => {
    return user.followers.includes(currentUser._id);
  };
  return (
    <div className={classes.root}>
      <Avatar
        alt={user.avatar}
        src={`${environment.baseUrlImage}${user.avatar}`}
      />
      <h3>{user.username}</h3>
      {isFollowed() ? (
        <Button
          onMouseOver={() => sethover(true)}
          onMouseOut={() => sethover(false)}
          className={classes.btn}
          onClick={() => handlerUnFollow(user)}
          size="small"
          variant="outlined"
          color="secondary"
        >
          {hover ? 'Unfollow ' : 'Following'}
        </Button>
      ) : (
        <Button
          onClick={() => handlerFollow(user)}
          size="small"
          variant="outlined"
          color="secondary"
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default UserBox;
