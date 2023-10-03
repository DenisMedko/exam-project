const nodemailer = require('nodemailer');
const EmailSendError = require('../errors/EmailSendError');
const { EMAIL_SMTP_AUTH_SETTINGS } = require('../constants');

const transporter = nodemailer.createTransport(EMAIL_SMTP_AUTH_SETTINGS);

module.exports.sendMailHandler = async (message) => {
  const { to, subject, text } = message;

  const mailOptions = {
    from: EMAIL_SMTP_AUTH_SETTINGS.auth.user,
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error) => {
    error && new EmailSendError(error.message);
  });
};
