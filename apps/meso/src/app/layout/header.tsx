// Core
import React from "react";

// Material
import Container from "@material-ui/core/Container";

// Material Theme
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

// Components
import { LangPicker } from "../../app/i18n";
import Account from "./account";
import Logo from "./logo";

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-between",
    alignItems: "center",
    height: theme.layout.header.height,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
}));

export interface HeaderProps {
  currentLang: string;
  isAuthenticated: boolean;
  supportedLanguages: string[];
  onChangeLang: (lang: string) => void;
}

const Header = ({
  currentLang,
  isAuthenticated,
  supportedLanguages,
  onChangeLang,
}: HeaderProps) => {
  const classes = useStyles();
  return (
    <header className={classes.root}>
      <Logo></Logo>
      <Container maxWidth="md">
        <div className={classes.container}>
          <Account isAuthenticated={isAuthenticated}></Account>
        </div>
      </Container>
      <LangPicker
        currentLang={currentLang}
        supportedLanguages={supportedLanguages}
        onChangeLang={onChangeLang}
      ></LangPicker>
    </header>
  );
};

export default Header;
