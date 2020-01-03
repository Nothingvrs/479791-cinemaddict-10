import {Time} from '../utils/common';
import AbstractSmartComponent from './abstract-smart-component';

export default class FilmCard extends AbstractSmartComponent {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
  }

  getTemplate() {
    return (`<article class="film-card">
            <h3 class="film-card__title">${this._filmCard.title}</h3>
            <p class="film-card__rating">${this._filmCard.rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${this._filmCard.year}</span>
              <span class="film-card__duration">${Math.floor(this._filmCard.duration / Time.HOUR)}h&nbsp;${this._filmCard.duration % Time.HOUR}m</span>
              <span class="film-card__genre">${this._filmCard.genre}</span>
            </p>
            <img src=${this._filmCard.poster} alt="" class="film-card__poster">
            <p class="film-card__description">${this._filmCard.description}</p>
            <a class="film-card__comments">${this._filmCard.comments} comments</a>
            <form class="film-card__controls">
            </form>
          </article>`);
  }

  getOpenCard(handler) {
    this.getElement().querySelectorAll(`img, .film-card__title, .film-card__comments`).forEach((element) => element.addEventListener(`click`, handler));
  }
}
