import AbstractSmartComponent from './abstract-smart-component';
import {render, RenderPosition} from '../utils/render';
import Rating from './rating';

export default class Watched extends AbstractSmartComponent {
  constructor(card, container) {
    super();
    this._container = container;
    this._filmCard = card;
    this._isWatched = this._filmCard.isWatched;
    this._subscribeOnEvent();
  }

  getTemplate() {
    const isFilmWatched = this._filmCard.isWatched ? `checked` : ``;

    return (`<div>
             <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isFilmWatched}>
             <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
            </div>`);
  }

  _subscribeOnEvent() {
    this.getElement().querySelector(`#watched`)
      .addEventListener(`change`, () => {
        this._isWatched = !this._isWatched;
        this.saveData();
        this.rerender();
      });
  }

  rerender() {
    if (this._isWatched) {
      render(this._container, new Rating(this._filmCard), RenderPosition.BEFORENODE);
      super.rerender();
    } else {
      super.rerender();
    }

  }

  recoveryListener() {
    this._subscribeOnEvent();
  }

  saveData() {
    this._filmCard.isWatched = this._isWatched;
  }
}
