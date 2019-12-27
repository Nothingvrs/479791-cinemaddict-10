import AbstractComponent from './abstract-component';
import {Time} from '../utils/common';

export default class FilmCard extends AbstractComponent {
  constructor(filmCard) {
    super();
    this._filmCard = filmCard;
  }

  getTemplate() {
    const getIsFavoriteClass = this._filmCard.isFavorite ? `film-card__controls-item--active` : ``;
    const getIsWatchedClass = this._filmCard.isWatched ? `film-card__controls-item--active` : ``;
    const getIsWatchlist = this._filmCard.isGoingToWatchlist ? `film-card__controls-item--active` : ``;
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
              <button class="film-card__controls-item button ${getIsWatchlist} film-card__controls-item--add-to-watchlist">Add to watchlist</button>
              <button class="film-card__controls-item button ${getIsWatchedClass} film-card__controls-item--mark-as-watched ">Mark as watched</button>
              <button class="film-card__controls-item button ${getIsFavoriteClass} film-card__controls-item--favorite ">Mark as favorite</button>
            </form>
          </article>`);
  }

  getOpenCard(handler) {
    this.getElement().querySelectorAll(`img, .film-card__title, .film-card__comments`).forEach((element) => element.addEventListener(`click`, handler));
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }
}
