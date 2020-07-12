import { environment } from '../../../environments/environment';

const getBrowserLang = (): string | undefined => {
  if (
    typeof window === 'undefined' ||
    typeof window.navigator === 'undefined'
  ) {
    return undefined;
  }

  let browserLang: any = window.navigator.languages
    ? window.navigator.languages[0]
    : null;

  return browserLang ? browserLang.split(/[-_]/)[0] : undefined;
};

const getConfigLang = () => {
  let language = 'en';
  let supportedLanguages = ['en'];
  if (environment.supportedLanguages && environment.defaultLanguage) {
    supportedLanguages = environment.supportedLanguages.split('_');
    const browserLang = getBrowserLang();
    if (browserLang) {
      language = supportedLanguages.includes(browserLang)
        ? browserLang
        : environment.defaultLanguage;
    }
  }

  return { language, supportedLanguages };
};

export default getConfigLang;
