'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate({ User, Conversation }) {
      Message.belongsTo(User, { foreignKey: 'sender', sourceKey: 'id' });
      Message.belongsTo(Conversation, {
        foreignKey: 'conversation',
        sourceKey: '_id',
      });
    }
  }
  Message.init(
    {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sender: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      conversation: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Conversations',
          key: '_id',
        },
      },
      body: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Message',
    }
  );
  return Message;
};
