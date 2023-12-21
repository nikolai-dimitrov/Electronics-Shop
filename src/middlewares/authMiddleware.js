const jwt = require("../lib/jwt");
const { JWT_SECRET } = require("../constants");

exports.authentication = async (req, res, next) => {
  const token = req.cookies["auth"];
  if (token) {
    try {
      const user = await jwt.verify(token, JWT_SECRET);

      req.user = user;
      res.locals.user = user;
      res.locals.isAuthenticated = true;

      next();
    } catch (error) {
      res.clearCookies("auth");
      res.redirect("/users/login");
    }
  } else {
    next();
  }
};

exports.isAuth = (param1) => {
  return function (req, res, next) {
    if (param1 == true) {
      if (!req.user) {
        res.redirect("/404");
        return;
      }
      next();
    } else {
      if (req.user) {
        res.redirect("/404");
        return;
      }
      next();
    }
  };
};
