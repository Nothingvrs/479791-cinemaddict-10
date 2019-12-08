import {createElement, Time} from "../utils";

export default class FilmCard {
  constructor(filmCard) {
    this._filmCard = filmCard;
    this._element = null;
  }

  getIsFavoriteClass() {
    return this._filmCard.isFavorite ? `film-card__controls-item--favorite` : ``;
  }

  getIsWatchedClass() {
    return this._filmCard.isWatched ? `film-card__controls-item--favorite` : ``;
  }

  getIsWatchlist() {
    return this._filmCard.isGoingToWatchlist ? `film-card__controls-item--favorite` : ``;
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
              <button class="film-card__controls-item button ${this.getIsWatchlist()}">Add to watchlist</button>
              <button class="film-card__controls-item button ${this.getIsWatchedClass()}">Mark as watched</button>
              <button class="film-card__controls-item button ${this.getIsFavoriteClass()}">Mark as favorite</button>
            </form>
          </article>`);
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
}
