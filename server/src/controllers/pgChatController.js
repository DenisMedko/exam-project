const {
  User,
  Catalog,
  Conversation,
  Message,
  Sequelize,
} = require('../models');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');

module.exports.addMessage = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.recipient];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  try {
    const [conversation] = await Conversation.findOrCreate({
      where: { participants },
      defaults: {
        participants,
        blackList: [0, 0],
        favoriteList: [0, 0],
      },
    });

    const message = await Message.create({
      sender: req.tokenData.userId,
      body: req.body.messageBody,
      conversation: conversation._id,
    });

    message.setDataValue('participants', participants);
    const interlocutorId = participants.filter(
      (participant) => participant !== req.tokenData.userId
    )[0];

    const preview = {
      _id: conversation._id,
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      createAt: message.createdAt,
      participants,
      blackList: conversation.blackList.map((element) => !!element),
      favoriteList: conversation.favoriteList.map((element) => !!element),
      interlocutor: {
        id: req.tokenData.userId,
        firstName: req.tokenData.firstName,
        lastName: req.tokenData.lastName,
        displayName: req.tokenData.displayName,
        avatar: req.tokenData.avatar,
        email: req.tokenData.email,
      },
    };
    controller.getChatController().emitNewMessage(interlocutorId, {
      message,
      preview,
    });
    res.send({
      message,
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor }),
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getChat = async (req, res, next) => {
  const participants = [req.tokenData.userId, req.body.interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );

  try {
    const conversation = await Conversation.findOne({
      where: { participants },
    });

    const interlocutor = await userQueries.findUser({
      id: req.body.interlocutorId,
    });

    if (!conversation) {
      res.send({ messages: [], interlocutor });
      return;
    }
    const messages = await Message.findAll({
      where: { conversation: conversation._id },
      order: [['createdAt', 'ASC']],
    });
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
        email: interlocutor.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getPreview = async (req, res, next) => {
  try {
    const conversations = await Conversation.findAll({
      include: [
        {
          model: Message,
          required: true,
          order: [['createdAt', 'DESC']],
          limit: 1,
        },
      ],
      where: {
        participants: {
          [Sequelize.Op.contains]: [req.tokenData.userId],
        },
      },
    });

    const interlocutors = [];
    conversations.forEach((conversation) => {
      interlocutors.push(
        conversation.participants.find(
          (participant) => participant !== req.tokenData.userId
        )
      );
    });
    const senders = await User.findAll({
      where: {
        id: interlocutors,
      },
      attributes: ['id', 'firstName', 'lastName', 'displayName', 'avatar'],
    });
    conversations.forEach((conversation) => {
      console.log(conversation);
      senders.forEach((sender) => {
        if (conversation.participants.includes(sender.dataValues.id)) {
          conversation.setDataValue('text', conversation.Messages[0].body);
          conversation.setDataValue(
            'blackList',
            conversation.blackList.map((element) => !!element)
          ),
            conversation.setDataValue(
              'favoriteList',
              conversation.favoriteList.map((element) => !!element)
            ),
            conversation.setDataValue('interlocutor', {
              id: sender.dataValues.id,
              firstName: sender.dataValues.firstName,
              lastName: sender.dataValues.lastName,
              displayName: sender.dataValues.displayName,
              avatar: sender.dataValues.avatar,
            });
        }
      });
    });
    res.send(conversations);
  } catch (err) {
    next(err);
  }
};

module.exports.blackList = async (req, res, next) => {
  try {
    const chat = await Conversation.findOne({
      where: { participants: req.body.participants },
    });
    if (!chat) {
      res.status(404).send('chat not found');
      return;
    }
    const index = req.body.participants.indexOf(req.tokenData.userId);
    const newArray = [...chat.blackList];
    newArray[index] = +req.body.blackListFlag;
    chat.blackList = newArray;
    await chat.save();
    chat.blackList = chat.blackList.map((element) => !!element);
    chat.favoriteList = chat.favoriteList.map((element) => !!element);
    res.send(chat);

    const interlocutorId = req.body.participants.filter(
      (participant) => participant !== req.tokenData.userId
    )[0];
    controller.getChatController().emitChangeBlockStatus(interlocutorId, chat);
  } catch (err) {
    res.send(err);
  }
};

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const chat = await Conversation.findOne({
      where: {
        participants: req.body.participants,
      },
    });
    if (!chat) {
      res.status(404).send('chat not found');
      return;
    }

    const index = req.body.participants.indexOf(req.tokenData.userId);
    const newArray = [...chat.favoriteList];
    newArray[index] = +req.body.favoriteFlag;
    chat.favoriteList = newArray;
    await chat.save();

    chat.blackList = chat.blackList.map((element) => !!element);
    chat.favoriteList = chat.favoriteList.map((element) => !!element);

    res.send(chat);
  } catch (err) {
    next(err);
  }
};

module.exports.createCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalog.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
      chats: [req.body.chatId],
    });

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalog.findOne({
      where: {
        _id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });

    if (!catalog) {
      res.status(404).send('Catalog not found');
      return;
    }

    catalog.catalogName = req.body.catalogName;
    await catalog.save();

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalog.findOne({
      where: {
        _id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });

    if (!catalog) {
      res.status(404).send('Catalog not found');
      return;
    }

    catalog.chats.push(req.body.chatId);
    await catalog.save();

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const catalog = await Catalog.findOne({
      where: {
        _id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });
    if (!catalog) {
      res.status(404).send('Catalog not found');
      return;
    }

    catalog.chats = catalog.chats.filter(
      (chatId) => chatId !== req.body.chatId
    );
    await catalog.save();

    res.send(catalog);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCatalog = async (req, res, next) => {
  try {
    await Catalog.destroy({
      where: {
        _id: req.body.catalogId,
        userId: req.tokenData.userId,
      },
    });

    res.end();
  } catch (err) {
    next(err);
  }
};

module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await Catalog.findAll({
      where: {
        userId: req.tokenData.userId,
      },
    });

    res.send(catalogs);
  } catch (err) {
    next(err);
  }
};
