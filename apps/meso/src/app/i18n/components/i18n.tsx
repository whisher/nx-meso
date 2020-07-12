import React, { ReactNode } from "react";
// I18n
import { IntlProvider } from "react-intl";

import messagesEn from "../translations/en.json";
import messagesIt from "../translations/it.json";

const messages: { [key: string]: any } = {
  en: messagesEn,
  it: messagesIt,
};

export interface I18nProps {
  children: ReactNode;
  language: string;
}
const I18n = ({ children, language }: I18nProps) => {
  return (
    <IntlProvider locale={language} messages={messages[language]}>
      {children}
    </IntlProvider>
  );
};
export default I18n;
