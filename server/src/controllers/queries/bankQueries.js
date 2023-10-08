const { Bank } = require('../../models');
const BankDeclineError = require('../../errors/BankDeclineError');
const CONSTANTS = require('../../constants');

module.exports.updateBankBalance = async (data, predicate, transaction) => {
  let isLowBalance = false;
  try {
    const [updatedCount, updatedBanks] = await Bank.update(data, {
      where: predicate,
      returning: true,
      transaction,
    });
    if (updatedCount < 2) {
      throw new BankDeclineError('Bank decline transaction');
    }
    updatedBanks.forEach((card) => {
      if (card.dataValues.balance < CONSTANTS.BANK_MIN_BALANCE) {
        isLowBalance = true;
      }
    });
  } catch (err) {
    throw new BankDeclineError('Bank decline transaction');
  }
  if (isLowBalance) {
    throw new BankDeclineError('Your balance is low. Bank decline transaction');
  }
};

module.exports.findOrCreateBankCard = async (data, predicate) => {
  try {
    await Bank.findOrCreate({
      where: predicate,
      defaults: {
        cardNumber: data.cardNumber,
        name: data.name,
        expiry: data.expiry,
        cvc: data.cvc,
        balance: 0,
      },
    });
  } catch (err) {
    throw new BankDeclineError('Bank decline transaction');
  }
};
