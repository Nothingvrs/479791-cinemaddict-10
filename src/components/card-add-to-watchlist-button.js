import AbstractSmartComponent from './abstract-smart-component';

export default class CardAddToWatchlist extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._filmCard = card;
    this._isWatchlist = this._filmCard.isGoingToWatchlist;
    this._subscribeOnEvent();
  }

  getTemplate() {
    const getIsWatchlist = this._filmCard.isGoingToWatchlist ? `film-card__controls-item--active` : ``;

    return (`<button class="film-card__controls-item button ${getIsWatchlist} film-card__controls-item--add-to-watchlist">Add to watchlist</button>`);
  }

  _subscribeOnEvent() {
    this.getElement().addEventListener(`click`, () => {
      this._isWatchlist = !this._isWatchlist;
      this.saveData();
      super.rerender();
    });
  }

  recoveryListener() {
    this._subscribeOnEvent();
  }

  saveData() {
    this._filmCard.isGoingToWatchlist = this._isWatchlist;
  }
}
