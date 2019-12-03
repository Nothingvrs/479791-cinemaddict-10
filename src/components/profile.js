import {generateRandomNumber} from "../utils";

const userRating = generateRandomNumber(30, 1);
const NOVICE_COUNT = 10;
const FAN_COUNT = 20;

const generateRating = (filmsAmount) => {
  let rating;
  if (filmsAmount < NOVICE_COUNT) {
    rating = (`novice`);
  } else if (filmsAmount > NOVICE_COUNT && filmsAmount < FAN_COUNT) {
    rating = (`fan`);
  } else if (filmsAmount > FAN_COUNT) {
    rating = (`movie buff`);
  } return rating;
};

export const createProfileRatingElement = () => {
  return (`<section class="header__profile profile">
                <p class="profile__rating">${generateRating(userRating)}</p>
                <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
           </section>`);
};
