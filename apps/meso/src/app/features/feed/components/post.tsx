// Core
import React, { useContext } from 'react';

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
import { CommentFormData } from '../../../types';

// Store
import { addCommentEffects, feedToggleLikeEffects } from '../../../store/feed';
import { postsToggleLikeEffects } from '../../../store/posts';

// Hooks
import { DispatchContext } from '../../../shared/hooks';

// Components
import { Comment } from './comment';
import CommentPostForm from './comment-form';

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
  media: {
    marginTop: theme.spacing(2),
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  cursor: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export interface PostProps {
  handleConfirmDeletePost?: (post: PostDto) => void;
  post: PostDto;
  user: UserDto;
}

const Post = ({ handleConfirmDeletePost, post, user }: PostProps) => {
  const classes = useStyles();
  const dispatch = useContext(DispatchContext);

  const isOwner = (): boolean => {
    return user._id === post.postedBy._id;
  };

  const onConfirmDeletePost = () => {
    handleConfirmDeletePost(post);
  };

  const onToggleLikePost = () => {
    const postId = post._id;
    if (isOwner()) {
      dispatch(postsToggleLikeEffects({ postId }));
    } else {
      dispatch(feedToggleLikeEffects({ postId }));
    }
  };

  const onSubmitComment = (data: CommentFormData) => {
    const commentData = { ...data, ...{ postId: post._id } };
    if (isOwner()) {
      dispatch(addCommentEffects(commentData));
    } else {
      dispatch(addCommentEffects(commentData));
    }
  };

  const iconDelete = isOwner() ? (
    <IconButton
      color="primary"
      aria-label="delete post"
      onClick={onConfirmDeletePost}
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
        <div>
          <Badge badgeContent={post.likes.length}>
            <FavoriteBorderIcon
              onClick={onToggleLikePost}
              className={classes.cursor}
              color="secondary"
            />
          </Badge>
        </div>
        <div>
          <Badge badgeContent={post.comments.length}>
            <MessageIcon color="secondary" />
          </Badge>
        </div>
      </div>
      <div>
        {post.comments.map((comment) => (
          <Comment comment={comment} user={user} />
        ))}
        <CommentPostForm onSubmit={onSubmitComment}></CommentPostForm>
      </div>
    </div>
  );
};

export default Post;
