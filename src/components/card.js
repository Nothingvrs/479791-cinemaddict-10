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
    const genres = this._filmCard.filmInfo.genres.join(`, `);
    const yearOfRelease = formatYear(this._filmCard.filmInfo.releaseDate);
    return (`<article class="film-card">
            <h3 class="film-card__title">${this._filmCard.filmInfo.title}</h3>
            <p class="film-card__rating">${this._filmCard.filmInfo.totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${yearOfRelease}</span>
              <span class="film-card__duration">${Math.floor(this._filmCard.filmInfo.duration / Time.HOUR)}h&nbsp;${this._filmCard.filmInfo.duration % Time.HOUR}m</span>
              <span class="film-card__genre">${genres}</span>
            </p>
            <img src=${this._filmCard.filmInfo.poster} alt="" class="film-card__poster">
            <p class="film-card__description">${this._filmCard.filmInfo.description}</p>
            <a class="film-card__comments">${createCommentsTitleText(this._filmCard.comments)} comments</a>
            <form class="film-card__controls">
            </form>
          </article>`);
  }

  getOpenCard(handler) {
    this.getElement().querySelectorAll(`img, .film-card__title, .film-card__comments`).forEach((element) => element.addEventListener(`click`, handler));
  }
}
