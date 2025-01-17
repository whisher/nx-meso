// Core
import React, { useEffect, useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Material
import Grid from '@material-ui/core/Grid';

// Intl
import { FormattedMessage } from 'react-intl';

// Store
import { feedLoadEffects } from '../../../store/feed';
import { postsAddEffects,postsDeleteEffects, postsLoadEffects } from '../../../store/posts';
import {
  usersFollowEffects,
  usersLoadEffects,
  usersUnFollowEffects,
} from '../../../store/users';

// Hooks
import { useAccount,DispatchContext, useFeed, usePosts, useUsers } from '../../../shared/hooks';

// Models
import {PostDto, UserDto } from '@iwdf/dto';

// Types
import { PostFormData } from '../../../types';

// Ui
import IwdfSpinner from '../../../shared/ui/spinner/spinner';

// Components
import {
  DialogConfirm,
  DialogFormPost,
  ThreadSwitcher,
  HintButton,
  Users,
} from '../components';

const Feed = () => {
  const dispatch = useDispatch();
  const { data: user, loaded: accountLoaded } = useAccount();
  const { data: feed, loaded: feedLoaded } = useFeed();
  const { data: posts, loaded: postsLoaded } = usePosts();
  const { data: users, loaded: usersLoaded } = useUsers();

  
  const [indexTabSwitcher, setIndexTabSwitcher] = useState<number>(0);
  const [openDialogFormPost, setOpenDialogFormPost] = useState<boolean>(false);
  const [openConfirmDeletePost, setOpenConfirmDeletePost] = useState<boolean>(
    false
  );
  const [postToDelete, setPostToDelete] = useState<PostDto | null>(null);

  useEffect(() => {
    if (accountLoaded) {
      dispatch(postsLoadEffects(user._id));
      dispatch(feedLoadEffects(user._id));
    }
    dispatch(usersLoadEffects());
  }, [dispatch, accountLoaded]);

  const onOpenDialogFormPost = () => {
    setOpenDialogFormPost(true);
  };

  const onFormPostSubmit = (data: PostFormData) => {
    dispatch(postsAddEffects(data));
    setOpenDialogFormPost(false);
    setIndexTabSwitcher(1);
  };

  const onHandleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setIndexTabSwitcher(newValue);
  };

  const onFollow = (data: UserDto) => {
    dispatch(usersFollowEffects(data));
  };

  const onUnFollow = (data: UserDto) => {
    dispatch(usersUnFollowEffects(data));
  };

  const onConfirmDeletePost = (post:PostDto) => {
    setPostToDelete(post);
    setOpenConfirmDeletePost(true);
  };

  const onConfirmDeletePostResponse = (post:PostDto) => {
    dispatch(postsDeleteEffects(post))
    setOpenConfirmDeletePost(false);
  };

  return (
    <>
      <DialogConfirm
        handleConfirm={onConfirmDeletePostResponse}
        open={openConfirmDeletePost} post={postToDelete}
      >
        <FormattedMessage id="post.confirm.delete.content" />
      </DialogConfirm>
      <DialogFormPost
        handlerPostSubmit={onFormPostSubmit}
        isDisabled={false}
        isLoading={false}
        open={openDialogFormPost}
        user={user}
      ></DialogFormPost>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={9}>
          <HintButton handlerOpenDialogFormPost={onOpenDialogFormPost}>
            What's up {user.username}?
          </HintButton>
          {postsLoaded && feedLoaded ? (
            <DispatchContext.Provider value={dispatch}>
            <ThreadSwitcher
              value={indexTabSwitcher}
              feed={feed}
              posts={posts}
              user={user}
              handleChange={onHandleChange}
              handleConfirmDeletePost={onConfirmDeletePost}  
            />
            </DispatchContext.Provider>
          ) : (
            <IwdfSpinner />
          )}
        </Grid>
        <Grid item xs={12} lg={3}>
          {usersLoaded ? (
            <Users
              users={users}
              handlerFollow={onFollow}
              handlerUnFollow={onUnFollow}
            />
          ) : (
            <IwdfSpinner />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Feed;
