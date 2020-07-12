// Core
import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Material Theme
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

// Store
import {
  selectLanguage,
  selectsupportedLanguages,
  setCurrentLang,
} from "../app/store/lang";

// I18n
import { I18n } from "./i18n";

// Hooks
import { useAuth } from "./shared/hooks";

// Components
import { Footer, Header, Main } from "./layout";

// Styles
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const currentLang = useSelector(selectLanguage);
  const supportedLanguages = useSelector(selectsupportedLanguages);

  const onChangeLang = (lang: string) => {
    dispatch(setCurrentLang(lang));
  };
  return (
    <I18n language={currentLang}>
      <div className={classes.root}>
        <Header
          currentLang={currentLang}
          isAuthenticated={isAuthenticated}
          supportedLanguages={supportedLanguages}
          onChangeLang={onChangeLang}
        ></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    </I18n>
  );
};

export default App;
