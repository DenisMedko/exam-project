const { User, Event, Sequelize } = require('../../models');
const NotFound = require('../../errors/UserNotFoundError');

module.exports.createEvent = async (data, userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFound('User not found');
  }
  return user.createEvent(data);
};
module.exports.getEvents = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new NotFound('User not found');
  }
  return user.getEvents({
    order: [
      ['remainingDate', 'ASC'],
      ['eventDate', 'ASC'],
    ],
  });
};

module.exports.removeEvent = async (data, userId) => {
  Event.destroy({
    where: { id: data, userId },
  });
  return data;
};
