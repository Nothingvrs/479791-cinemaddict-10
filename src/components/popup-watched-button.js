import AbstractSmartComponent from './abstract-smart-component';
import Rating from './rating';
import Movie from '../models/movie';

export default class PopupWatched extends AbstractSmartComponent {
  constructor(cardID, movieModel, container, onDataChange) {
    super();
    this._container = container;
    this._filmCard = null;
    this._movieModel = movieModel;
    this._movieModel.getCardsAll().forEach((card) => {
      if (cardID === card.id) {
        this._filmCard = card;
      }
    });
    this._onDataChange = onDataChange;
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
    this._ratingElement.renderRating(this._filmCard.isWatched);
    this.getElement().querySelector(`#watched`)
      .addEventListener(`change`, () => {
        this._saveAndRerender();
      });
  }

  recoveryListener() {
    this._subscribeOnEvent();
  }

  _saveAndRerender() {
    const newMovie = Movie.clone(this._filmCard);
    newMovie.isWatched = !newMovie.isWatched;
    if (newMovie.isWatched) {
      newMovie.watchingDate = new Date();
    }
    if (!newMovie.isWatched) {
      newMovie.userRating = 0;
    }

    return this._onDataChange(this, this._filmCard, newMovie);
  }
}

