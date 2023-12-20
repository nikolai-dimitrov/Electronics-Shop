const express = require("express");
const path = require("path");
const router = require("../router");
const cookieParser = require("cookie-parser");
const { authentication } = require("../middlewares/authMiddleware");

const setupExpress = (app) => {
  const staticFiles = express.static(path.resolve(__dirname, "../public"));
  app.use(staticFiles);
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(authentication);
  app.use(router);
};
module.exports = setupExpress;
