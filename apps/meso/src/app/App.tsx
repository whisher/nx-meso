// Core
import React from 'react';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Store
import {
  selectLanguage,
  selectsupportedLanguages,
  setCurrentLang,
} from '../app/store/lang';

// I18n
import { I18n } from './i18n';

// Hooks
import { useAuth } from './shared/hooks';

// Components
import { Main } from './layout';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const currentLang = useSelector(selectLanguage);
  const supportedLanguages = useSelector(selectsupportedLanguages);

  const onChangeLang = (lang: string) => {
    dispatch(setCurrentLang(lang));
  };
  return (
    <I18n language={currentLang}>
      <Main
        currentLang={currentLang}
        isAuthenticated={isAuthenticated}
        supportedLanguages={supportedLanguages}
        onChangeLang={onChangeLang}
      ></Main>
    </I18n>
  );
};

export default App;
