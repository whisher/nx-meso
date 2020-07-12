// Core
import React from "react";

// Material
import Box from "@material-ui/core/Box";

// Intl
import { FormattedMessage } from "react-intl";

// Models
import { UserDto } from "../../../types";

export interface UsersListProps {
  loaded: boolean;
  users: UserDto[];
}

const UsersList = ({ loaded, users }: UsersListProps) => {
  return (
    <>
      <Box component="h3" color="white" bgcolor="primary.main">
        <FormattedMessage id="posts.user.header" />
      </Box>
    </>
  );
};

export default UsersList;
