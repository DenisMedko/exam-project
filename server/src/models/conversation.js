'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Message }) {
      Conversation.hasMany(Message, {
        foreignKey: 'conversation',
        targetKey: 'id',
      });
    }
  }
  Conversation.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      participants: DataTypes.ARRAY(DataTypes.INTEGER),
      blackList: DataTypes.ARRAY(DataTypes.INTEGER),
      favoriteList: DataTypes.ARRAY(DataTypes.INTEGER),
      oldId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Conversation',
    }
  );
  return Conversation;
};
