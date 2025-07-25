const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  if (statusCode === 404) {
    res.status(404).json({
      message: "Not found",
    });
  } else {
    res.status(statusCode).json({
      message: err.message,
    });
  }
};

module.exports = { errorHandler };
