import { LangState } from "../../types";

export const selectLanguage = (state: { lang: LangState }): string =>
  state.lang.language;
export const selectsupportedLanguages = (state: {
  lang: LangState;
}): string[] => state.lang.supportedLanguages;
