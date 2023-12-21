const mongoose = require("mongoose");
exports.extractErrorMessages = (error) => {
  if (error instanceof mongoose.Error) {
    // return Object.values(error.errors).map((e) => e.message);
    return Object.values(error.errors)[0].message;
  } else if (error instanceof Error) {
    // return [error.message];
    return error.message;
  }
};
