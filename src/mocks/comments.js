import {getRandomArrayElements, getRandomValue, randomDate} from '../utils/common';


const authorComment = [
  `Tim Macoveev`,
  `John Doe`,
  `Jerry Black`,
  `Aaron Mac Calister`
];

const textComment = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];

const emojiComment = [
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`
];

export const generateComment = () => {
  return {
    author: getRandomArrayElements(authorComment),
    text: getRandomValue(textComment),
    emoji: getRandomValue(emojiComment),
    date: randomDate(new Date(2010, 1, 1), new Date())
  };
};

export const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};
