// Core
import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Material
import Grid from '@material-ui/core/Grid';

// Store
import { usersLoadEffects } from '../../store/users';

// Hooks
import { useAccount } from '../../shared/hooks';
import { useUsers } from '../../shared/hooks';

// Models
import { PostDto } from '@iwdf/dto';

// Types
import { PostFormData } from '../../types';

// Services
import { PostsService } from '../../services';

// Components
import { PostForm, UserList } from './components';

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loaded } = useUsers();
  const { data: user, loaded: accountLoaded } = useAccount();
  useEffect(() => {
    dispatch(usersLoadEffects());
  }, [dispatch]);
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
      </Grid>
      <Grid item xs={12} lg={3}>
        <UserList loaded={loaded} users={data} />
      </Grid>
    </Grid>
  );
};
export default Posts;
