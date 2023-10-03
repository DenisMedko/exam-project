const ApplicationError = require('./ApplicationError');

class EmailSendError extends ApplicationError {
  constructor(message) {
    super(message || 'Email sending error', 500);
  }
}

module.exports = EmailSendError;
