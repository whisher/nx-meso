// Core
import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Material
import Grid from '@material-ui/core/Grid';

// Store
import { postsLoadEffects } from '../../../store/posts';
import { usersLoadEffects } from '../../../store/users';

// Hooks
import { useAccount, usePosts, useUsers } from '../../../shared/hooks';

// Models
import { PostDto } from '@iwdf/dto';

// Types
import { PostFormData } from '../../../types';

// Services
import { PostsService } from '../../../services';

// Ui
import IwdfSpinner from '../../../shared/ui/spinner/spinner';

// Components
import { PostForm, PostsList, UsersList } from '../components';

const Feed: React.FC = () => {
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
    PostsService.add(data).then(console.log);
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
        {usersLoaded ? <UsersList users={users} /> : <IwdfSpinner />}
      </Grid>
    </Grid>
  );
};

export default Feed;
