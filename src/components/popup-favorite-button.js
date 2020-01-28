import AbstractSmartComponent from './abstract-smart-component';
import Movie from '../models/movie';

export default class PopupFavorite extends AbstractSmartComponent {
  constructor(card, onDataChange) {
    super();
    this._onDataChange = onDataChange;
    this._filmCard = card;
    this._subscribeOnEvent();
  }

  getTemplate() {
    const isFilmFavorite = this._filmCard.isFavorite ? `checked` : ``;

    return (`<div class="film-details__control-wrap">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFilmFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </div>`);
  }

  _subscribeOnEvent() {
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, () => {
      this._saveAndRerender();
    });
  }

  recoveryListener() {
    this._subscribeOnEvent();
  }

  _saveAndRerender() {
    const newMovie = Movie.clone(this._filmCard);
    newMovie.isFavorite = !newMovie.isFavorite;

    return this._onDataChange(this, this._filmCard, newMovie);
  }
}
