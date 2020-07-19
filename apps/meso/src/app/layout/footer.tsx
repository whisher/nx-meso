import React from 'react';

// Material
import Container from '@material-ui/core/Container';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-between',
    alignItems: 'center',
    height: theme.layout.footer.height,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <Container maxWidth="md">
        <p> &copy; {new Date().getFullYear()}</p>
      </Container>
    </footer>
  );
};

export default Footer;
