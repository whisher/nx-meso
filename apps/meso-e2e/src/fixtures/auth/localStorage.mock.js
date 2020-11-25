export const authLocalStorage = {
  account: {
    error: false,
    loaded: true,
    data: {
      _id: '5fb95d4a993e7d2af67073a6',
      avatar: 'profile-image.jpg',
      username: 'aaaa',
      email: 'aa@aa.aa',
      iat: 1606042142,
      exp: 1606049342,
    },
  },
  auth: {
    error: false,
    loading: false,
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmI5NWQ0YTk5M2U3ZDJhZjY3MDczYTYiLCJhdmF0YXIiOiJwcm9maWxlLWltYWdlLmpwZyIsInVzZXJuYW1lIjoiYWFhYSIsImVtYWlsIjoiYWFAYWEuYWEiLCJpYXQiOjE2MDYwNDIxNDIsImV4cCI6MTYwNjA0OTM0Mn0.uGHrORcAnPWy_r95RFXzwYYUSVF1ub4mLuz3HHSXcKU',
  },
  lang: {
    language: 'en',
    supportedLanguages: ['en', 'it'],
  },
};

export function adaptToReduxPersist(mockValue) {
  // redux-persist converte il valore totale e le proprietà di primo livello in stringa:
  // Es: {a: {foo: 'bar'}} -> {a: JSON.stringify({foo: 'bar'})} -> JSON.stringify({a: JSON.stringify({foo: 'bar'})});
  // quindi per far funzionare correttamente i test, dobbiamo simulare questo comportamento
  const partialConversion = Object.keys(mockValue).reduce((acc, key) => {
    acc[key] = JSON.stringify(mockValue[key]);
    return acc;
  }, {});
  return JSON.stringify(partialConversion);
}
