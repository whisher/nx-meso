// Core
import React from 'react';

// Material
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
import MessageIcon from '@material-ui/icons/Message';

// Libs
import ReadMoreReact from 'read-more-react';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

import { environment } from '../../../../environments/environment';

// Models
import { UserDto, PostDto } from '@iwdf/dto';

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
  media: {
    marginTop: theme.spacing(2),
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  spacer: {
    paddingRight: theme.spacing(1),
  },
  cursor: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export interface PostBoxProps {
  handleConfirmDeletePost?: (post: PostDto) => void;
  post: PostDto;
  user: UserDto;
}

const Post = ({ handleConfirmDeletePost, post, user }: PostBoxProps) => {
  const classes = useStyles();

  const onConfirmDelete = () => {
    handleConfirmDeletePost(post);
  };

  const iconDelete =
    user._id === post.postedBy._id ? (
      <IconButton
        color="primary"
        aria-label="delete post"
        onClick={onConfirmDelete}
      >
        <DeleteOutlineIcon />
      </IconButton>
    ) : null;

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.subheader}>
          <Avatar
            alt={post.postedBy.avatar}
            src={`${environment.baseUrlImage}${post.postedBy.avatar}`}
          />
          <h3>{post.postedBy.username}</h3>
        </div>
        {iconDelete}
      </div>
      <div className={classes.content}>
        <ReadMoreReact text={post.text} />
      </div>
      {post.image ? (
        <div className={classes.media}>
          <img
            alt={`post-id-${post._id}-image`}
            src={`${environment.baseUrlImage}${post.image}`}
          />
        </div>
      ) : null}
      <div className={classes.footer}>
        <div className={classes.spacer}>
          <Badge badgeContent={post.likes.length}>
            <FavoriteBorderIcon className={classes.cursor} color="primary" />
          </Badge>
        </div>
        <div>
          <Badge badgeContent={post.comments.length}>
            <MessageIcon color="secondary" />
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Post;
