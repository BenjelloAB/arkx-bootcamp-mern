const logger = (req, res, next) => {
  const now = new Date().toString();
  console.log(req.method + " " + req.path + " " + now);
  next();
};

module.exports = logger;