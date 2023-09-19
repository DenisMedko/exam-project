'use strict';
require('../dbMongo/mongoose');
const MongoConversation = require('../models/mongoModels/conversation');
const MongoMessage = require('../models/mongoModels/Message');
const MongoCatalog = require('../models/mongoModels/Catalog');
const { Catalog, Conversation, Message, sequelize } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction;
    try {
      transaction = await sequelize.transaction();

      const mongoConversations = await MongoConversation.find();
      for (const mongoConversation of mongoConversations) {
        const [pgConversation] = await Conversation.findOrCreate({
          where: {
            participants: mongoConversation.participants,
          },
          defaults: {
            blackList: mongoConversation.blackList.map((element) => +element),
            favoriteList: mongoConversation.blackList.map(
              (element) => +element
            ),
            createdAt: mongoConversation.createdAt,
          },
          transaction,
        });
        const cursorCatalogs = await MongoCatalog.find({
          chats: { $elemMatch: { $eq: mongoConversation._id } },
        });
        cursorCatalogs.forEach(async (mongoCatalog) => {
          const [pgCatalog] = await Catalog.findOrCreate({
            where: {
              userId: mongoCatalog.userId,
              catalogName: mongoCatalog.catalogName,
            },
            transaction,
          });
          if (!pgCatalog.chats) {
            pgCatalog.chats = [pgConversation._id];
            await pgCatalog.save();
          } else if (!pgCatalog.chats.includes(pgConversation._id)) {
            pgCatalog.chats = [...pgCatalog.chats, pgConversation._id];
            await pgCatalog.save();
          }
        });
        const mongoMessages = await MongoMessage.aggregate([
          {
            $lookup: {
              from: 'conversations',
              localField: 'conversation',
              foreignField: '_id',
              as: 'conversationData',
            },
          },
          {
            $match: {
              'conversationData.participants': mongoConversation.participants,
            },
          },
          { $sort: { createdAt: 1 } },
          {
            $project: {
              sender: 1,
              body: 1,
              conversation: 1,
              createdAt: 1,
              updatedAt: 1,
            },
          },
        ]);
        for (const mongoMessage of mongoMessages) {
          await Message.findOrCreate({
            where: {
              sender: mongoMessage.sender,
              createdAt: mongoMessage.createdAt,
            },
            defaults: {
              conversation: pgConversation._id,
              body: mongoMessage.body,
            },
            transaction,
          });
        }
      }
      transaction.commit();
    } catch (err) {
      transaction.rollback();
      console.error('data transfer error:', err);
      throw new Error(`data transfer error: ${err}`);
    }
  },

  down: async (queryInterface, Sequelize) => {},
};
