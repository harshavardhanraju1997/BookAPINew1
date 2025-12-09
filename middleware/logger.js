const fs = require("fs");
exports.loggerMiddleware = function (req, res, next) {
  {
    const log = `\n${new Date().toLocaleString()}  : Method is ${req.method} : Path is  ${req.path}`;
    console.log("Log is:::"+log);

    fs.appendFileSync("log.txt", log, "utf-8");
    next();
  }
};
