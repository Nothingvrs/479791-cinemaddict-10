import PopupAddToWatchlist from './popup-add-to-watchlist-button';

export default class CardAddToWatchlist extends PopupAddToWatchlist {

  getTemplate() {
    const getIsWatchlist = this._filmCard.isGoingToWatchlist ? `film-card__controls-item--active` : ``;

    return (`<button class="film-card__controls-item button ${getIsWatchlist} film-card__controls-item--add-to-watchlist">Add to watchlist</button>`);
  }

  _subscribeOnEvent() {
    this.getElement().addEventListener(`click`, () => {
      this.__saveAndRerender();
    });
  }
}
