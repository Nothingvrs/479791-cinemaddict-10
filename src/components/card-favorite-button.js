import AbstractSmartComponent from './abstract-smart-component';

export default class CardFavorite extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._filmCard = card;
    this._isFavorite = this._filmCard.isFavorite;
    this._subscribeOnEvent();
  }

  getTemplate() {
    const getIsFavoriteClass = this._filmCard.isFavorite ? `film-card__controls-item--active` : ``;

    return (`<button class="film-card__controls-item button ${getIsFavoriteClass} film-card__controls-item--favorite ">Mark as favorite</button>`);
  }

  _subscribeOnEvent() {
    this.getElement().addEventListener(`click`, () => {
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
  }
}
