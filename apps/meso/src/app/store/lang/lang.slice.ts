import { createSlice } from "@reduxjs/toolkit";
import { LangState } from "../../types";

import { getConfigLang } from "../../i18n";

const { language, supportedLanguages } = getConfigLang();

const langInitialState: LangState = {
  language,
  supportedLanguages,
};

export const langSlice = createSlice({
  name: "lang",
  initialState: langInitialState as LangState,
  reducers: {
    setCurrentLang: (state, action) => {
      return {
        ...state,
        language: action.payload,
      };
    },
  },
});

export const { setCurrentLang } = langSlice.actions;

export default langSlice.reducer;
