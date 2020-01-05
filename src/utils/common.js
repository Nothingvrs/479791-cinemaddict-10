export const generateRandomNumber = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

export const generateRandomBoolean = () => Math.random() > 0.5;

export const getRandomValue = (values) => values[generateRandomNumber(values.length)];

export const randomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const getRandomArrayElements = (array, amount) => {
  let newArray = [];

  while (amount > 0) {
    newArray.push(array[generateRandomNumber(array.length)]);
    amount--;
  }
  return newArray;
};

export const Time = {
  HOUR: 60,
  MINUTE: 60,
};

import moment from 'moment';

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatCommentDate = (date) => {
  return moment(date).fromNow();
};
