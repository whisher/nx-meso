// Core
import React from 'react';

// Routing
import { NavLink } from 'react-router-dom';

// Material
import Typography from '@material-ui/core/Typography';

// Icons
import ShareIcon from '@material-ui/icons/Share';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    fontSize: '2rem',
  },
  link: {
    color: theme.palette.primary.contrastText,
    textDecoration: 'none',
  },
  wrapper: {
    display: 'flex',
    'align-items': 'center',
  },
}));
const Logo = () => {
  const u = true;
  const classes = useStyles();
  return u ? (
    <Typography className={classes.root} variant="h1">
      <NavLink className={classes.link} to="/">
        <div className={classes.wrapper}>
          <ShareIcon />
          <span>Meso</span>
        </div>
      </NavLink>
    </Typography>
  ) : null;
};

export default Logo;
