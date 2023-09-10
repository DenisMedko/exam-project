'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Conversation.init(
    {
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