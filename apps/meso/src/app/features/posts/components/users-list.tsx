// Core
import React from 'react';

// Material
import Box from '@material-ui/core/Box';

// Intl
import { FormattedMessage } from 'react-intl';

// Models
import { UserDto } from '@iwdf/dto';

import UserBox from './user-box';

export interface UsersListProps {
  loaded: boolean;
  users: UserDto[];
}

const UsersList = ({ loaded, users }: UsersListProps) => {
  return (
    <div>
      <Box component="h3" color="white" bgcolor="primary.main">
        <FormattedMessage id="posts.user.header" />
      </Box>
      {users.map((user) => (
        <UserBox key={user._id} user={user}></UserBox>
      ))}
    </div>
  );
};

export default UsersList;
