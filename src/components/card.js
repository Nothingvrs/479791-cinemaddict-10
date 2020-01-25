import {formatYear, Time} from '../utils/common';
import AbstractSmartComponent from './abstract-smart-component';

const createCommentsTitleText = (comments) => {
  switch (comments.length) {
    case 0:
      return `no comments yet`;
    case 1:
      return `1 comment`;
    default:
      return `${comments.length} comments`;
  }
};

export default class FilmCard extends AbstractSmartComponent {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
  }

  getTemplate() {
    const genres = this._filmCard.film_info.genre.join(`, `);
    const yearOfRelease = formatYear(this._filmCard.film_info.release.date);
    return (`<article class="film-card">
            <h3 class="film-card__title">${this._filmCard.film_info.title}</h3>
            <p class="film-card__rating">${this._filmCard.film_info.total_rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${yearOfRelease}</span>
              <span class="film-card__duration">${Math.floor(this._filmCard.film_info.runtime / Time.HOUR)}h&nbsp;${this._filmCard.film_info.runtime % Time.HOUR}m</span>
              <span class="film-card__genre">${genres}</span>
            </p>
            <img src=${this._filmCard.film_info.poster} alt="" class="film-card__poster">
            <p class="film-card__description">${this._filmCard.film_info.description}</p>
            <a class="film-card__comments">${createCommentsTitleText(this._filmCard.comments)} comments</a>
            <form class="film-card__controls">
            </form>
          </article>`);
  }

  getOpenCard(handler) {
    this.getElement().querySelectorAll(`img, .film-card__title, .film-card__comments`).forEach((element) => element.addEventListener(`click`, handler));
  }
}
