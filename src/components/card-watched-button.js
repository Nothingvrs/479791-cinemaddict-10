import AbstractSmartComponent from './abstract-smart-component';

export default class CardWatched extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._filmCard = card;
    this._isWatched = this._filmCard.isWatched;
    this._subscribeOnEvent();
  }

  getTemplate() {
    const getIsWatchedClass = this._filmCard.isWatched ? `film-card__controls-item--active` : ``;

    return (`<button class="film-card__controls-item button ${getIsWatchedClass} film-card__controls-item--mark-as-watched ">Mark as watched</button>`);
  }

  _subscribeOnEvent() {
    this.getElement().addEventListener(`click`, () => {
      this._isWatched = !this._isWatched;
      this.saveData();
      super.rerender();
    });
  }

  recoveryListener() {
    this._subscribeOnEvent();
  }

  saveData() {
    this._filmCard.isWatched = this._isWatched;
  }
}
