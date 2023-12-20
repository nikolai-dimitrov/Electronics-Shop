const mongoose = require("mongoose");
const modelValidator = require("../validators/modelValidators");
const electronicSchema = new mongoose.Schema({
  name: {
    type: "String",
    required: [true, "Name is required."],
    minLength: [10, "Name should be at least 10 characters."],
  },
  type: {
    type: "String",
    required: [true, "Type is required."],
    minLength: [2, "Type should be at least 2 characters."],
  },
  damages: {
    type: "String",
    required: [true, "Damages is required."],
    minLength: [10, "Damages should be at least 10 characters."],
  },
  image: {
    type: "String",
    required: [true, "Image is required."],
    validate: [
      {
        validator: modelValidator.validateUrl,
        message: "Image field should start with http:// or https://",
      },
    ],
  },
  description: {
    type: "String",
    required: [true, "Description is required."],
    minLength: [10, "Description should be at least 10 characters."],
    maxLength: [200, "Description should lower than 200 characters."],
  },
  production: {
    type: "Number",
    required: [true, "Production is required."],
    min: [1900, "Production year must be greater than 1900."],
    max: [2023, "Production year must be lower than 2023."],
  },
  exploitation: {
    type: "Number",
    required: [true, "Exploitation  is required."],
    validate: [
      {
        validator: modelValidator.positiveNumberValidator,
        message: "Exploitation should be positive number.",
      },
    ],
  },
  price: {
    type: "Number",
    required: [true, "Price  is required."],
    validate: [
      {
        validator: modelValidator.positiveNumberValidator,
        message: "Price should be positive number.",
      },
    ],
  },
  buyingList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});
const Electronic = mongoose.model("Electronic", electronicSchema);
module.exports = Electronic;
