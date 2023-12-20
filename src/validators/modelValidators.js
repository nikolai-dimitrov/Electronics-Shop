exports.validateUrl = (url) => {
  let valueStr = url.toString();
  if (!valueStr.startsWith("http://") && !valueStr.startsWith("https://")) {
    return false;
  }
  return true;
};

exports.positiveNumberValidator = (value) => {
  return value > 0;
};
