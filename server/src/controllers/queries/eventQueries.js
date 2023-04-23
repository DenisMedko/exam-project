const { User, Event } = require('../../models');
const NotFound = require('../../errors/UserNotFoundError');

module.exports.createEvent = async (data, userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFound('User not found');
  }
  return user.createEvent(data);
};
module.exports.getEvents = async (userId) => {
  const events = Event.findAll({ where: { userId } });
  return events;
};
