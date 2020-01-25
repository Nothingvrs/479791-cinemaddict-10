import moment from 'moment';

export const getRandomArrayElement = (array) => {
  const rand = Math.floor(Math.random() * array.length);

  return (array[rand]);
};

export const Time = {
  HOUR: 60,
  MINUTE: 60,
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formatCommentDate = (date) => {
  return moment(date).format(`DD/MM/YYYY hh:mm`);
};

export const formatYear = (date) => {
  return moment(date).format(`YYYY`);
};
