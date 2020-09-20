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
import { postsAddEffects, postsLoadEffects } from '../../../store/posts';
import {
  usersFollowEffects,
  usersLoadEffects,
  usersUnFollowEffects,
} from '../../../store/users';

// Hooks
import { useAccount, useFeed, usePosts, useUsers } from '../../../shared/hooks';

// Contexts
import { DeletePostContext } from '../../../shared/contexts';

// Models
import { UserDto } from '@iwdf/dto';

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

  const onConfirmDeletePost = (flag: boolean) => {
    setOpenConfirmDeletePost(true);
    console.log('flag', flag);
  };

  return (
    <>
      <DialogConfirm
        handleConfirm={onConfirmDeletePost}
        open={openConfirmDeletePost}
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
            <DeletePostContext.Provider value={onConfirmDeletePost}>
              <ThreadSwitcher
                value={indexTabSwitcher}
                feed={feed}
                posts={posts}
                user={user}
                handleChange={onHandleChange}
              />
            </DeletePostContext.Provider>
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
