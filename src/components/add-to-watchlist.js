import AbstractSmartComponent from './abstract-smart-component';

export default class AddToWatchlist extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._filmCard = card;
    this._isGoingToWatchlist = null;
    this._subscribeOnEvent();
  }

  getTemplate() {
    const isFilmGoingToWatchlist = this._filmCard.isGoingToWatchlist ? `checked` : ``;

    return (`<div>
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isFilmGoingToWatchlist}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
            </div>`);
  }

  _subscribeOnEvent() {
    this.getElement().querySelector(`#watchlist`)
    .addEventListener(`change`, () => {
      this._isGoingToWatchlist = !this._isGoingToWatchlist;
      this.saveData();
      super.rerender();
    });
  }

  recoveryListener() {
    this._subscribeOnEvent();
  }

  saveData() {
    this._filmCard.isGoingToWatchlist = this._isGoingToWatchlist;
  }
}
