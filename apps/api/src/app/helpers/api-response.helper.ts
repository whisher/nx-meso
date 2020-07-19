export const successResponseWithData = <T extends unknown>(res, data) => {
  return res.status(200).json(data) as T;
};

export const errorResponse = (res, msg) => {
  var resData = {
    errors: [{ msg }],
  };
  return res.status(500).json(resData);
};

export const notFoundResponse = (res, msg) => {
  var resData = {
    errors: [{ msg }],
  };
  return res.status(404).json(resData);
};

export const validationErrorWithData = (res, data) => {
  var resData = {
    errors: data,
  };
  return res.status(422).json(resData);
};

export const unauthorizedResponse = (res, msg) => {
  var resData = {
    errors: [{ msg }],
  };
  return res.status(401).json(resData);
};
