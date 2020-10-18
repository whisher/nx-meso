// Core
import React from 'react';

// Material
import Avatar from '@material-ui/core/Avatar';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { environment } from '../../../../environments/environment';

// Models
import { CommentDto, UserDto } from '@iwdf/dto';

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subheader: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  content: {},
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export interface CommentProps {
  comment: CommentDto;
  user: UserDto;
}

const Comment = ({ comment, user }: CommentProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.subheader}>
          <Avatar
            className={classes.small}
            alt={comment.postedBy.avatar}
            src={`${environment.baseUrlImage}${comment.postedBy.avatar}`}
          />
          <h3>{comment.postedBy.username}</h3>
        </div>
      </div>
      <div className={classes.content}>{comment.text}</div>
    </div>
  );
};

export { Comment };
