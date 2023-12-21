const express = require("express");
const { PORT } = require("./constants");
const expressConfig = require("./configs/expressConfig");
const handlebarsConfig = require("./configs/handlebarsConfig");
const mongooseConfig = require("./configs/mongooseConfig");
// const router = require("./router");
app = express();
async function startApp(app) {
  try {
    expressConfig(app);
    handlebarsConfig(app);
    mongooseConfig();

    app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

startApp(app);
