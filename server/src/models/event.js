'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      Event.belongsTo(User, {
        foreignKey: 'userId',
        sourceKey: 'id',
        as: 'powers',
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
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      remainingDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
