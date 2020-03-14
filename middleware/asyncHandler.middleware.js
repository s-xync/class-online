const boom = require("boom");

const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    if (err && err.isBoom) {
      return next(err);
    }
    return next(boom.badImplementation(err));
  });
};

module.exports = asyncHandler;
