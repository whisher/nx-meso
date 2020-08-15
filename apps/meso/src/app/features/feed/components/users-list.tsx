// Core
import React from 'react';

// Material
import Box from '@material-ui/core/Box';

// Intl
import { FormattedMessage } from 'react-intl';

// Models
import { UserDto } from '@iwdf/dto';

// Services
import { UsersService } from '../../../services';

import UserBox from './user-box';

export interface UsersListProps {
  users: UserDto[];
}

const UsersList = ({ users }: UsersListProps) => {
  const onFollow = (user: UserDto) => {
    UsersService.addFollow(user).then((data) => {});
  };
  const onUnFollow = (user: UserDto) => {
    //UsersService.addFollow(user).then((data) => {});
  };
  return (
    <div>
      <Box component="h3" color="white" bgcolor="primary.main">
        <FormattedMessage id="post.user.header" />
      </Box>
      {users.map((user) => (
        <UserBox
          key={user._id}
          user={user}
          handlerFollow={onFollow}
          handlerUnFollow={onUnFollow}
        ></UserBox>
      ))}
    </div>
  );
};

export default UsersList;
