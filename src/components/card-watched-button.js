import PopupWatched from './popup-watched-button';

export default class CardWatched extends PopupWatched {

  getTemplate() {
    const getIsWatchedClass = this._filmCard.isWatched ? `film-card__controls-item--active` : ``;

    return (`<button class="film-card__controls-item button ${getIsWatchedClass} film-card__controls-item--mark-as-watched ">Mark as watched</button>`);
  }

  _subscribeOnEvent() {
    this.getElement().addEventListener(`click`, () => {
      this.__saveAndRerender();
    });
  }
}
