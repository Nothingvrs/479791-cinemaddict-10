import AbstractSmartComponent from './abstract-smart-component';
import Movie from '../models/movie';

export default class PopupAddToWatchlist extends AbstractSmartComponent {
  constructor(card, onDataChange) {
    super();
    this._onDataChange = onDataChange;
    this._filmCard = card;
    this._subscribeOnEvent();
  }

  getTemplate() {
    const isFilmGoingToWatchlist = this._filmCard.isInWatchlist ? `checked` : ``;

    return (`<div class="film-details__control-wrap">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="going_to_watchlist" name="watchlist" ${isFilmGoingToWatchlist}>
            <label for="going_to_watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            </div>`);
  }

  _subscribeOnEvent() {
    this.getElement().querySelector(`#going_to_watchlist`)
    .addEventListener(`change`, () => {
      this._saveAndRerender();
    });
  }

  recoveryListener() {
    this._subscribeOnEvent();
  }

  _saveAndRerender() {
    const newMovie = Movie.clone(this._filmCard);
    newMovie.isInWatchlist = !newMovie.isInWatchlist;

    return this._onDataChange(this, this._filmCard, newMovie);
  }
}
