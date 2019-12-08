import {createElement, generateRandomNumber} from '../utils';

export default class Profile {
  constructor() {
    this._element = null;
    this._filmsAmount = generateRandomNumber(30, 1);
    this._noviceCount = 10;
    this._fanCount = 20;
  }

  getTemplate() {
    generateRandomNumber(30, 1);
    return (`<section class="header__profile profile">
                <p class="profile__rating">${this.generateRating()}</p>
                <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
           </section>`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  generateRating() {
    let rating;
    if (this._filmsAmount < this._noviceCount) {
      rating = `novice`;
    } else if (this._filmsAmount > this._noviceCount && this._filmsAmount < this._fanCount) {
      rating = `fan`;
    } else if (this._filmsAmount > this._fanCount) {
      rating = `movie buff`;
    } return rating;
  }
}
