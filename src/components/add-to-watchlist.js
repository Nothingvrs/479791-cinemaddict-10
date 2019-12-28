import AbstractSmartComponent from './abstract-smart-component';

export default class AddToWatchlist extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._filmCard = card;
    this._isGoingToWatchlist = null;
  }

  getTemplate() {
    const isFilmGoingToWatchlist = this._filmCard.isGoingToWatchlist ? `checked` : ``;

    return (`<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isFilmGoingToWatchlist}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>`);
  }

  _subscribeOnEvent() {
    this.getElement().querySelector(`#watchlist`)
    .addEventListener(`change`, () => {
      this._isGoingToWatchlist = !this._isGoingToWatchlist;
      this.saveData();
      this.rerender();
    });
  }

  saveData() {
    this._filmCard.isGoingToWatchlist = this._isGoingToWatchlist;
  }
}
