// Core
import React from 'react';

// Intl
import { FormattedMessage } from 'react-intl';

// Redux
import { useDispatch } from 'react-redux';

// Material
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Model
import { UserDto } from '@iwdf/dto';

// Store
import { authLogout } from '../store/auth';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
}));

export interface AccountMenuProps {
  account: UserDto | null;
  loaded: boolean;
}
const AccountMenu = ({ account, loaded }: AccountMenuProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(authLogout());
  };
  return loaded ? (
    <div className={classes.root}>
      <Avatar alt={account?.username} src="/images/profile-image.jpg" />
      <Button
        variant="outlined"
        color="secondary"
        aria-controls="account-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {account?.username}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <FormattedMessage id="account.me" />
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <FormattedMessage id="account.logout" />
        </MenuItem>
      </Menu>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
export default AccountMenu;
