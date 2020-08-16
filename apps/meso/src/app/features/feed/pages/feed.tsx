// Core
import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Material
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
import { PostForm, PostsList, UsersList } from '../components';

const Feed = () => {
  const dispatch = useDispatch();
  const { data: user, loaded: accountLoaded } = useAccount();
  const { data: posts, loaded: postsLoaded } = usePosts();
  const { data: users, loaded: usersLoaded } = useUsers();

  useEffect(() => {
    if (accountLoaded) {
      dispatch(postsLoadEffects(user._id));
    }
    dispatch(usersLoadEffects());
  }, [dispatch, accountLoaded]);

  const onPostSubmit = (data: PostFormData) => {
    dispatch(postsAddEffects(data));
  };

  const onFollow = (data: UserDto) => {
    dispatch(usersFollowEffects(data));
  };

  const onUnFollow = (data: UserDto) => {
    dispatch(usersUnFollowEffects(data));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={9}>
        <PostForm
          onSubmit={onPostSubmit}
          isDisabled={false}
          isLoading={false}
          user={user}
        ></PostForm>
        {postsLoaded ? (
          <PostsList posts={posts} user={user} />
        ) : (
          <IwdfSpinner />
        )}
      </Grid>
      <Grid item xs={12} lg={3}>
        {usersLoaded ? (
          <UsersList
            users={users}
            handlerFollow={onFollow}
            handlerUnFollow={onUnFollow}
          />
        ) : (
          <IwdfSpinner />
        )}
      </Grid>
    </Grid>
  );
};

export default Feed;
