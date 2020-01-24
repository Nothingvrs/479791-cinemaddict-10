import {
  randomDate,
  getRandomValue,
  generateRandomNumber,
  getRandomArrayElements,
  generateRandomBoolean,
  getRandomArrayElement,
} from '../utils/common.js';

const titles = [
  `The Lion King`,
  `The Bucket List`,
  `The Notebook`,
  `Kimi no na wa`,
  `La La Land`,
  `The Green Mile`,
  `Gattaca`,
  `Honig im Kopf`,
  `Barfuss`,
  `Home Alone`,
  `Chocolate`,
  `Leon`,
  `Les Choristes`,
  `Burlesque`,
  `The Great Gatsby`
];

const posters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const actors = [
  `Эми Адамс`,
  `Дженнифер Анистон`,
  `Бен Аффлек`,
  `Кейси Аффлек`,
  `Антонио Бандерас`,
  `Хавьер Бардем`,
  `Джерард Батлер`,
  `Шон Бин`,
  `Эмили Блант`,
  `Кейт Бланшетт`,
  `Орландо Блум`,
  `Фёдор Бондарчук`,
  `Джош Бролин`,
  `Стив Бушеми`,
  `Кристиан Бэйл`
];

const descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus`.split(`. `);

const genres = [
  `Romance comedy`,
  `Horror`,
  `Documentary`,
  `Thriller`,
];

const restrictions = new Set([0, 6, 12, 16, 18]);

const countries = new Set([
  `United Kingdom`,
  `Sweden`,
  `Austria`,
  `France`,
  `Germany`,
  `Italy`,
  `United States`,
  `Canada`,
  `Russia`,
  `Spain`,
  `Korea`,
  `Japan`
]);

new Date().toLocaleString(`ru`, {
  year: `numeric`,
  month: `long`,
  day: `numeric`
});

const viewingDates = [`all`, `today`, `week`, `month`, `year`];

const generateFilmCard = () => {
  const datePremiere = randomDate(new Date(1900, 1, 1), new Date());
  return {
    id: String(new Date() + Math.random()),
    title: getRandomValue(titles),
    totalRating: generateRandomNumber(10, 1),
    personalRating: generateRandomNumber(10, 1),
    year: datePremiere.getFullYear(),
    duration: generateRandomNumber(360, 60),
    genre: genres.slice(0, generateRandomNumber(9, 1)),
    description: getRandomArrayElements(descriptions, generateRandomNumber(3)).join(`. `),
    comments: generateRandomNumber(200),
    isFavorite: generateRandomBoolean(),
    isWatched: generateRandomBoolean(),
    isGoingToWatchlist: generateRandomBoolean(),
    poster: getRandomValue(posters),
    actors: getRandomArrayElements(actors, 3).join(`, `),
    writers: getRandomArrayElements(actors, 3).join(`, `),
    director: getRandomArrayElements(actors, 2).join(`, `),
    restrictions: getRandomValue(Array.from(restrictions)),
    premiere: datePremiere,
    country: getRandomValue(Array.from(countries)),
    viewingDate: getRandomArrayElement(viewingDates),
  };
};

const generateFimCards = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilmCard);
};

export {generateFilmCard, generateFimCards};
