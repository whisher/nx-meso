// Core
import React from 'react';

// Material
import Box from '@material-ui/core/Box';

// Intl
import { FormattedMessage } from 'react-intl';

// Models
import { UserDto } from '@iwdf/dto';

// Components
import User from './user';

export interface UsersListProps {
  handlerFollow: (user: UserDto) => void;
  handlerUnFollow: (user: UserDto) => void;
  users: UserDto[];
}

const Users = ({ handlerFollow, handlerUnFollow, users }: UsersListProps) => {
  return (
    <div>
      <Box component="h3" color="white" bgcolor="primary.main">
        <FormattedMessage id="post.user.header" />
      </Box>
      {users.map((user) => (
        <User
          key={user._id}
          user={user}
          handlerFollow={handlerFollow}
          handlerUnFollow={handlerUnFollow}
        ></User>
      ))}
    </div>
  );
};

export default Users;
