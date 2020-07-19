// Core
import React, { useEffect } from 'react';

// Redux
import { useDispatch } from 'react-redux';

// Material

import Grid from '@material-ui/core/Grid';

// Store
import { usersLoadEffects } from '../../store/users';

// Hooks
import { useUsers } from '../../shared/hooks';

// Components
import { UserList } from './components';

const Posts: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loaded } = useUsers();
  useEffect(() => {
    dispatch(usersLoadEffects());
  }, [dispatch]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={9}>
        {' ppp'}
      </Grid>
      <Grid item xs={12} lg={3}>
        <UserList loaded={loaded} users={data} />
      </Grid>
    </Grid>
  );
};
export default Posts;
