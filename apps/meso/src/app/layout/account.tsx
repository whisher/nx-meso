// Core
import React from "react";
import { Link } from "react-router-dom";

// Material
import Button from "@material-ui/core/Button";

import { useAccount } from "../shared/hooks";

import AccountMenu from "./account-menu";

export interface AccountProps {
  isAuthenticated: boolean;
}
const Account = ({ isAuthenticated }: AccountProps) => {
  const { data, loaded } = useAccount();
  return isAuthenticated ? (
    <AccountMenu account={data} loaded={loaded} />
  ) : (
    <Button
      variant="outlined"
      color="secondary"
      component={Link}
      to={"/auth/login"}
    >
      Login
    </Button>
  );
};

export default Account;
