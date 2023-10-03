const fs = require('fs').promises;
const path = require('path');
const CONSTANTS = require('../../constants');
const logFilePath = path.join(
  CONSTANTS.LOG_FILES_PATH,
  CONSTANTS.LOG_FILE_NAME
);
async function checkFileExists(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

async function createFile(filePath) {
  try {
    await fs.writeFile(filePath, '', 'utf8');
    return true;
  } catch (err) {
    console.error('file-creation error:', err);
    return false;
  }
}

async function checkOrCreateFile(filePath) {
  let fileExists = await checkFileExists(filePath);

  if (!fileExists) {
    fileExists = await createFile(filePath);
  }

  return fileExists;
}
const getFormattedDate = (date, delimiter) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Додаємо 1, бо місяці в JavaScript починаються з 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}${delimiter}${month}${delimiter}${day}${delimiter}${hours}${delimiter}${minutes}${delimiter}${seconds}`;

  return formattedDate;
};
const parseStringToObject = (str) => {
  const logRecordObj = {};
  const keyValuePairs = str.slice(1, -1).split(',');
  keyValuePairs.forEach((pair) => {
    const keyValue = pair.split(':');
    const key = keyValue[0].trim();
    const value = keyValue[1].trim();
    logRecordObj[key] = value;
  });
  return logRecordObj;
};
module.exports.errorLogger = async (errorData, errorTime) => {
  const fileExists = await checkOrCreateFile(logFilePath);
  if (fileExists) {
    const stack = errorData.stack.replace(/[\n\t]/g, '');
    const logData = `{message: "${errorData.message}", time: ${errorTime}, code: ${errorData.code}, stackTrace: {"${stack}"}}`;
    try {
      await fs.appendFile(logFilePath, logData + '\n', 'utf8');
    } catch (err) {
      console.error('error-file writing error: ', err);
    }
  }
};
module.exports.errorLogBackup = async () => {
  const backupFileName = `${getFormattedDate(new Date(Date.now()), '_')}.txt`;
  const backupFilePath = path.join(
    CONSTANTS.LOG_BACKUP_FILES_PATH,
    backupFileName
  );
  const logFileExists = await checkFileExists(logFilePath);
  if (logFileExists) {
    const backupFileExists = await checkOrCreateFile(backupFilePath);
    if (backupFileExists) {
      const logData = await fs.readFile(logFilePath, 'utf8');
      const records = logData.split('\n');
      records.forEach(async (record) => {
        if (!record.trim().length) {
          return;
        }
        const backupLogRecordObj = parseStringToObject(record);
        try {
          const backupLogData = `{ message: ${backupLogRecordObj.message}, code: ${backupLogRecordObj.code}, time: ${backupLogRecordObj.time}}`;
          await fs.appendFile(backupFilePath, backupLogData + '\n', 'utf8');
        } catch (err) {
          console.error('error-file writing error: ', err);
        }
      });
      await fs.writeFile(logFilePath, '', 'utf8');
    }
  }
};
