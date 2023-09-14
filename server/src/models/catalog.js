'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      Catalog.belongsTo(User, { foreignKey: 'userId', sourceKey: 'id' });
    }
  }
  Catalog.init(
    {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      catalogName: {
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
        type: DataTypes.STRING,
      },
      chats: DataTypes.ARRAY(DataTypes.STRING),
      oldChats: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: 'Catalog',
    }
  );
  return Catalog;
};
