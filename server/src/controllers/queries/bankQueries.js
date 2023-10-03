const { Bank } = require('../../models');
const BankDeclineError = require('../../errors/BankDeclineError');

module.exports.updateBankBalance = async (data, predicate, transaction) => {
  try {
    const [updatedCount, [updatedBank]] = await Bank.update(data, {
      where: predicate,
      returning: true,
      transaction,
    });
    if (updatedCount < 2) {
      throw new BankDeclineError('Bank decline transaction');
    }
  } catch (err) {
    throw new BankDeclineError('Bank decline transaction');
  }
};
