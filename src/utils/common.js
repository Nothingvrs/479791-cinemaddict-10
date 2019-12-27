export const generateRandomNumber = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

export const generateRandomBoolean = () => Math.random() > 0.5;

export const getRandomValue = (values) => values[generateRandomNumber(values.length)];

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

export const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${day} ${month} ${year}`;
};
