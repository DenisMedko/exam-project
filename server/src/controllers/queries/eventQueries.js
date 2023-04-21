const { User, Event } = require('../../models');
const NotFound = require('../../errors/UserNotFoundError');
const ServerError = require('../../errors/ServerError');

module.exports.createEvent = async (data, userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFound('User not found');
  }
  return user.createEvent(data);
};
