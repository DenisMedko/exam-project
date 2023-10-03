const { errorLogger } = require('../errors/errorLogger/errorLogger');
module.exports = (err, req, res, next) => {
  if (
    err.message ===
      'new row for relation "Banks" violates check constraint "Banks_balance_ck"' ||
    err.message ===
      'new row for relation "Users" violates check constraint "Users_balance_ck"'
  ) {
    err.message = 'Not Enough money';
    err.code = 406;
  }
  err.code = err.code ? err.code : 500;
  err.message = err.message ? err.message : 'Server Error';
  res.status(err.code).send(err.message);
  errorLogger(err, Date.now());
};
