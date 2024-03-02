const handleErrors = (err, req, res, next) => {
  let statusCode = err.status ? err.status : 500;
  res.status(statusCode).json({ [err.name]: err.message });
};

module.exports = handleErrors;
