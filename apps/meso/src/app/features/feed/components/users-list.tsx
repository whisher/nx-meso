// Core
import React from 'react';

// Material
import Box from '@material-ui/core/Box';

// Intl
import { FormattedMessage } from 'react-intl';

// Models
import { UserDto } from '@iwdf/dto';

// Components
import UserBox from './user-box';

export interface UsersListProps {
  handlerFollow: (user: UserDto) => void;
  handlerUnFollow: (user: UserDto) => void;
  users: UserDto[];
}

const UsersList = ({
  handlerFollow,
  handlerUnFollow,
  users,
}: UsersListProps) => {
  return (
    <div>
      <Box component="h3" color="white" bgcolor="primary.main">
        <FormattedMessage id="post.user.header" />
      </Box>
      {users.map((user) => (
        <UserBox
          key={user._id}
          user={user}
          handlerFollow={handlerFollow}
          handlerUnFollow={handlerUnFollow}
        ></UserBox>
      ))}
    </div>
  );
};

export default UsersList;
