const AuthService = require('../services/authService');
const { User } = require('../models');
const UserNotFoundError = require('../errors/UserNotFoundError');
const NotUniqueEmail = require('../errors/NotUniqueEmail');
const { UniqueConstraintError } = require('sequelize');
const ServerError = require('../errors/ServerError');

module.exports.login = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      return next(new UserNotFoundError('Invalid login data'));
    }

    const responseData = await AuthService.createSession(user);

    res.send(responseData);
  } catch (error) {
    next(error);
  }
};

module.exports.registration = async (req, res, next) => {
  try {
    const {
      body,
      body: { email },
    } = req;

    const foundUser = await User.findOne({ where: { email } });
    if (foundUser) {
      return next(new NotUniqueEmail('User with this e-mail already exists'));
    }

    const user = await User.create(body);

    const responseData = await AuthService.createSession(user);

    res.status(201).send(responseData);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return next(new ServerError('Not unique user data'));
    }
    next(error);
  }
};

module.exports.refresh = async (req, res, next) => {
  try {
    const { refreshTokenInstance } = req;

    const responseData = await AuthService.refreshSession(refreshTokenInstance);

    res.send(responseData);
  } catch (error) {
    next(error);
  }
};
