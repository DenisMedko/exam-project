import _ from 'lodash';
import moment from 'moment';
import 'moment-timezone';
import CONSTANTS from '../constants';

export const pushAndSortArr = (arr, item, sortBy) => {
  arr.push(item);
  return _.sortBy(arr, [...sortBy]);
};

export const filterArrayByField = (
  array = [],
  field,
  value,
  operator = 'eq'
) => {
  if (!array?.length || !field || !value) {
    return array;
  }
  return array.filter((item) => _[operator](item[field], value));
};

export const getTimeDiffStr = (data) => {
  const diff = moment.duration(moment().diff(moment(data)));
  let str = '';
  if (diff._data.years !== 0) str += `${diff._data.years}y `;
  if (diff._data.months !== 0) str += `${diff._data.months}m `;
  if (diff._data.days !== 0) str += `${diff._data.days}d `;
  if (diff._data.hours !== 0) str += `${diff._data.hours}h`;
  if (str.length === 0) str = 'less than one hour';
  return str;
};

export const getTimeDiffStrRevers = (data) => {
  const diff = moment.duration(moment(data).diff(moment()));
  let str = '';
  if (diff._data.years > 0) str += `${diff._data.years}y `;
  if (diff._data.months > 0) str += `${diff._data.months}m `;
  if (diff._data.days > 0) str += `${diff._data.days}d `;
  if (diff._data.hours > 0) str += `${diff._data.hours}h `;
  if (diff._data.minutes > 0) str += `${diff._data.minutes}min `;
  if (diff._data.seconds > 0) str += `${diff._data.seconds}s`;
  if (str.length === 0) str = `Now it's time to do!`;
  return str;
};
export const getTimeDiffMilliseconds = (data) => {
  const diff = moment.duration(moment(data).diff(moment()));
  const timeLeft = diff._milliseconds;
  return timeLeft;
};
export const dateInLocalTimezone = (data) =>
  moment
    .tz(data, 'YYYY-MM-DD HH:mm:ssZ', CONSTANTS.TIME_ZONE)
    .format('DD-MM-YYYY HH:mm:ss');
