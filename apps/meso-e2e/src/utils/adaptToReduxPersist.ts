export const adaptToReduxPersist = (mockValue) => {
  // redux-persist converte il valore totale e le proprietà di primo livello in stringa:
  // Es: {a: {foo: 'bar'}} -> {a: JSON.stringify({foo: 'bar'})} -> JSON.stringify({a: JSON.stringify({foo: 'bar'})});
  // quindi per far funzionare correttamente i test, dobbiamo simulare questo comportamento
  const partialConversion = Object.keys(mockValue).reduce((acc, key) => {
    acc[key] = JSON.stringify(mockValue[key]);
    return acc;
  }, {});
  return JSON.stringify(partialConversion);
};
