import AbstractSmartComponent from './abstract-smart-component';

export default class Favorite extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._filmCard = card;
    this._isFavorite = null;
    this._subscribeOnEvent();
  }

  getTemplate() {
    const isFilmFavorite = this._filmCard.isFavorite ? `checked` : ``;

    return (`<div>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFilmFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
            </div>`);
  }

  _subscribeOnEvent() {
    this.getElement().querySelector(`#favorite`)
      .addEventListener(`change`, () => {
        this._isFavorite = !this._isFavorite;
        this.saveData();
        super.rerender();
      });
  }

  recoveryListener() {
    this._subscribeOnEvent();
  }

  saveData() {
    this._filmCard.isFavorite = this._isFavorite;
    this._filmCard.isFavorite = this._isFavorite;
  }
}
