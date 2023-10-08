const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants');
const {
  sequelize,
  Sequelize,
  Rating,
  Offer,
  Contest,
  User,
} = require('../models');
const moment = require('moment');
const { v4: uuid } = require('uuid');
const controller = require('../socketInit');
const userQueries = require('./queries/userQueries');
const bankQueries = require('./queries/bankQueries');
const ratingQueries = require('./queries/ratingQueries');
const eventQueries = require('./queries/eventQueries');
const NotEnoughMoney = require('../errors/NotEnoughMoney');

function getQuery(offerId, userId, mark, isFirst, transaction) {
  const getCreateQuery = () =>
    ratingQueries.createRating(
      {
        offerId,
        mark,
        userId,
      },
      transaction
    );
  const getUpdateQuery = () =>
    ratingQueries.updateRating({ mark }, { offerId, userId }, transaction);
  return isFirst ? getCreateQuery : getUpdateQuery;
}

module.exports.changeMark = async (req, res, next) => {
  let sum = 0;
  let avg = 0;
  let transaction;
  const { isFirst, offerId, mark, creatorId } = req.body;
  const userId = req.tokenData.userId;
  try {
    transaction = await sequelize.transaction({
      isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED,
    });
    const query = getQuery(offerId, userId, mark, isFirst, transaction);
    await query();
    const offersArray = await Rating.findAll({
      include: [
        {
          model: Offer,
          required: true,
          where: { userId: creatorId },
        },
      ],
      transaction,
    });
    for (let i = 0; i < offersArray.length; i++) {
      sum += offersArray[i].dataValues.mark;
    }
    avg = sum / offersArray.length;

    await userQueries.updateUser({ rating: avg }, creatorId, transaction);
    transaction.commit();
    controller.getNotificationController().emitChangeMark(creatorId);
    res.send({ userId: creatorId, rating: avg });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.payment = async (req, res, next) => {
  let transaction;
  const {
    number,
    cvc: buyerCardCVC,
    expiry: buyerCardExpiry,
    price,
  } = req.body;
  const buyerCardNumber = number.replace(/ /g, '');
  const squadCardNumber = CONSTANTS.SQUADHELP_BANK_NUMBER;
  const squadCardCVC = CONSTANTS.SQUADHELP_BANK_CVC;
  const squadCardExpiry = CONSTANTS.SQUADHELP_BANK_EXPIRY;
  const caseLiteral = `CASE 
                        WHEN 
                          "cardNumber"='${buyerCardNumber}' 
                          AND "cvc"='${buyerCardCVC}' 
                          AND "expiry"='${buyerCardExpiry}'
                        THEN 
                          "balance"-${price}
                        WHEN 
                          "cardNumber"='${squadCardNumber}' 
                          AND "cvc"='${squadCardCVC}' 
                          AND "expiry"='${squadCardExpiry}'
                        THEN 
                          "balance"+${price} 
                      END`;
  try {
    transaction = await sequelize.transaction();
    await bankQueries.updateBankBalance(
      {
        balance: sequelize.literal(caseLiteral),
      },
      {
        cardNumber: {
          [Sequelize.Op.in]: [squadCardNumber, buyerCardNumber],
        },
      },
      transaction
    );
    const orderId = uuid();
    req.body.contests.forEach((contest, index) => {
      const prize =
        index === req.body.contests.length - 1
          ? Math.ceil(req.body.price / req.body.contests.length)
          : Math.floor(req.body.price / req.body.contests.length);
      contest = Object.assign(contest, {
        status: index === 0 ? 'active' : 'pending',
        userId: req.tokenData.userId,
        priority: index + 1,
        orderId,
        createdAt: moment().format('YYYY-MM-DD HH:mm'),
        prize,
      });
    });
    await Contest.bulkCreate(req.body.contests, transaction);
    transaction.commit();
    res.send();
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.avatar = req.file.filename;
    }
    const updatedUser = await userQueries.updateUser(
      req.body,
      req.tokenData.userId
    );
    res.send({
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      displayName: updatedUser.displayName,
      avatar: updatedUser.avatar,
      email: updatedUser.email,
      balance: updatedUser.balance,
      role: updatedUser.role,
      id: updatedUser.id,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.cashout = async (req, res, next) => {
  let transaction;
  const { userId } = req.tokenData;
  const {
    number,
    name: creatorName,
    expiry: creatorCardExpiry,
    cvc: creatorCardCVC,
    sum,
  } = req.body;
  const creatorCardNumber = number.replace(/ /g, '');
  const squadCardNumber = CONSTANTS.SQUADHELP_BANK_NUMBER;
  const squadCardCVC = CONSTANTS.SQUADHELP_BANK_CVC;
  const squadCardExpiry = CONSTANTS.SQUADHELP_BANK_EXPIRY;
  const caseLiteral = `CASE 
                        WHEN 
                          "cardNumber"='${creatorCardNumber}' 
                          AND "expiry"='${creatorCardExpiry}' 
                          AND "cvc"='${creatorCardCVC}'
                        THEN 
                          "balance"+${sum}
                        WHEN 
                          "cardNumber"='${squadCardNumber}' 
                          AND "expiry"='${squadCardExpiry}' 
                          AND "cvc"='${squadCardCVC}'
                        THEN 
                          "balance"-${sum}
                      END`;
  try {
    transaction = await sequelize.transaction();
    const { balance } = await User.findByPk(userId);
    if (+balance < +sum) {
      throw new NotEnoughMoney(`Not enough money. Your balance is ${balance}`);
    }

    const updatedUser = await userQueries.updateUser(
      {
        balance: sequelize.literal('balance - ' + sum),
      },
      userId,
      transaction
    );
    await bankQueries.findOrCreateBankCard(
      {
        cardNumber: creatorCardNumber,
        name: creatorName,
        expiry: creatorCardExpiry,
        cvc: creatorCardCVC,
      },
      { cardNumber: creatorCardNumber }
    );
    await bankQueries.updateBankBalance(
      {
        balance: sequelize.literal(caseLiteral),
      },
      {
        cardNumber: {
          [Sequelize.Op.in]: [squadCardNumber, creatorCardNumber],
        },
      },
      transaction
    );
    transaction.commit();
    res.send({ balance: updatedUser.balance });
  } catch (err) {
    transaction.rollback();
    next(err);
  }
};

module.exports.addEvent = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const newEvent = await eventQueries.createEvent(req.body, userId);
    res.status(201).send({ data: newEvent });
  } catch (err) {
    next(err);
  }
};

module.exports.getEvents = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const events = await eventQueries.getEvents(userId);
    res.status(200).send({ data: events });
  } catch (err) {
    next(err);
  }
};

module.exports.removeEvent = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    const eventId = req.headers.eventid;
    const deletedId = await eventQueries.removeEvent(eventId, userId);
    res.status(200).send({ data: deletedId });
  } catch (err) {
    next(err);
  }
};
