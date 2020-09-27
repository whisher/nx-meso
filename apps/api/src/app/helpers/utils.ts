export const stripsTags = (text) => {
  return text.replace(/(<([^>]+)>)/gi, '');
};
