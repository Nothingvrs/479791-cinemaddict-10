import AbstractSmartComponent from './abstract-smart-component';
import Rating from './rating';

export default class PopupWatched extends AbstractSmartComponent {
  constructor(card, container) {
    super();
    this._container = container;
    this._filmCard = card;
    this._isWatched = this._filmCard.isWatched;
    this._ratingElement = new Rating(this._filmCard, this._container);
    this._subscribeOnEvent();
  }

  getTemplate() {
    const isFilmWatched = this._filmCard.isWatched ? `checked` : ``;

    return (`<div class="film-details__control-wrap">
             <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isFilmWatched}>
             <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            </div>`);
  }

  _subscribeOnEvent() {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`change`, () => {
        this._handler();
      });
  }

  rerender() {
    super.rerender();
    this._ratingElement.renderRating(this._filmCard.isWatched);
  }


  recoveryListener() {
    this._subscribeOnEvent();
  }

  saveData() {
    this._filmCard.isWatched = this._isWatched;
  }

  _handler() {
    this._isWatched = !this._isWatched;
    this.saveData();
    this.rerender();
  }
}
