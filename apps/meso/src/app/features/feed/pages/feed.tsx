// Core
import React, { useEffect, useState } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Material
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// Store
import { postsAddEffects, postsLoadEffects } from '../../../store/posts';
import {
  usersFollowEffects,
  usersLoadEffects,
  usersUnFollowEffects,
} from '../../../store/users';

// Hooks
import { useAccount, usePosts, useUsers } from '../../../shared/hooks';

// Models
import { UserDto } from '@iwdf/dto';

// Types
import { PostFormData } from '../../../types';

// Ui
import IwdfSpinner from '../../../shared/ui/spinner/spinner';

// Components
import { DialogFormPost, FeedSwitcher, HintButton, Users } from '../components';

const Feed = () => {
  const dispatch = useDispatch();
  const { data: user, loaded: accountLoaded } = useAccount();
  const { data: posts, loaded: postsLoaded } = usePosts();
  const { data: users, loaded: usersLoaded } = useUsers();

  const [indexTabSwitcher, setIndexTabSwitcher] = useState<number>(0);
  const [openDialogFormPost, setOpenDialogFormPost] = useState<boolean>(false);

  useEffect(() => {
    if (accountLoaded) {
      dispatch(postsLoadEffects(user._id));
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

  const onFollow = (data: UserDto) => {
    dispatch(usersFollowEffects(data));
  };

  const onUnFollow = (data: UserDto) => {
    dispatch(usersUnFollowEffects(data));
  };

  return (
    <>
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
          {postsLoaded ? (
            <FeedSwitcher index={indexTabSwitcher} posts={posts} user={user} />
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

/*
handlerPostSubmit: (data: PostFormData) => void;
  isDisabled: boolean;
  isLoading: boolean;
  open: boolean;
  user: UserDto;
*/
