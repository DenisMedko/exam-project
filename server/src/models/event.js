'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate({ User }) {
      Event.belongsTo(User, {
        foreignKey: 'userId',
        sourceKey: 'id',
      });
    }
  }
  Event.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      eventDate: {
        type: DataTypes.DATE,
        time: true,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      remainingDate: {
        type: DataTypes.DATE,
        time: true,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Event',
      timestamps: false,
    }
  );
  return Event;
};
