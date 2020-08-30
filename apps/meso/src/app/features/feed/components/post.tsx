// Core
import React from 'react';

// Material
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { environment } from '../../../../environments/environment';

// Models
import { UserDto, PostDto } from '@iwdf/dto';

export interface PostBoxProps {
  post: PostDto;
  user: UserDto;
}

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
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
  footer: {
    display: 'flex',
    justifyContent: 'space-start',
    alignItems: 'center',
  },
}));
const Post = ({ post, user }: PostBoxProps) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.subheader}>
          <Avatar
            alt={user.avatar}
            src={`${environment.baseUrlImage}${user.avatar}`}
          />
          <h3>{user.username}</h3>
        </div>
        <IconButton color="primary" aria-label="delete post">
          <DeleteOutlineIcon />
        </IconButton>
      </div>
      <div className={classes.content}>{post.text}</div>
      <div className={classes.footer}>
        <Badge badgeContent={post.likes.length} color="primary">
          <FavoriteBorderIcon />
        </Badge>
        <Badge badgeContent={post.comments.length} color="secondary">
          <MessageIcon />
        </Badge>
      </div>
    </div>
  );
};

export default Post;
