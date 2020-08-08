import React from 'react';

// Material
import Container from '@material-ui/core/Container';

// Material Theme
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

// Components
import { LangPicker } from '../../app/i18n';
import Account from './account';
import Footer from './footer';
import Logo from './logo';
import Router from './router';

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: theme.layout.header.height,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  account: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  main: {
    flex: '1 1 auto',
    paddingTop: theme.spacing(2),
  },
}));

export interface MainProps {
  currentLang: string;
  isAuthenticated: boolean;
  supportedLanguages: string[];
  onChangeLang: (lang: string) => void;
}
const Main = ({
  currentLang,
  isAuthenticated,
  supportedLanguages,
  onChangeLang,
}: MainProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <Logo></Logo>

        <Container maxWidth="md">
          <div className={classes.account}>
            <Account isAuthenticated={isAuthenticated}></Account>
          </div>
        </Container>

        <LangPicker
          currentLang={currentLang}
          supportedLanguages={supportedLanguages}
          onChangeLang={onChangeLang}
        ></LangPicker>
      </header>
      <main className={classes.main}>
        <Container maxWidth="md">
          <Router isAuthenticated={isAuthenticated}></Router>
        </Container>
      </main>
      <footer>
        <Container maxWidth="md">
          <Footer></Footer>
        </Container>
      </footer>
    </div>
  );
};

export default Main;
