import AbstractComponent from './abstract-component';
import {render, RenderPosition} from '../utils/render';

export default class Rating extends AbstractComponent {
  constructor(card, container) {
    super();
    this._container = container;
    this._filmCard = card;
    this._undoButton = this.getElement().querySelector(`.film-details__watched-reset`);
    this._ratingButtons = this.getElement().querySelectorAll(`.film-details__user-rating-input`);
    this._removeRating = this._removeRating.bind(this);
  }

  getTemplate() {
    return (`<div class="form-details__middle-container">
         <section class="film-details__user-rating-wrap">
           <div class="film-details__user-rating-controls">
             <button class="film-details__watched-reset" type="button">Undo</button>
           </div>
    
           <div class="film-details__user-score">
             <div class="film-details__user-rating-poster">
               <img src="${this._filmCard.filmInfo.poster}" alt="film-poster" class="film-details__user-rating-img">
    </div>
    
    <section class="film-details__user-rating-inner">
      <h3 class="film-details__user-rating-title">The Great Flamarion</h3>
    
    <p class="film-details__user-rating-feelings">How you feel it?</p>
    
    <div class="film-details__user-rating-score">
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
      <label class="film-details__user-rating-label" for="rating-1">1</label>
    
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
      <label class="film-details__user-rating-label" for="rating-2">2</label>
    
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
      <label class="film-details__user-rating-label" for="rating-3">3</label>
    
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
      <label class="film-details__user-rating-label" for="rating-4">4</label>
    
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
      <label class="film-details__user-rating-label" for="rating-5">5</label>
    
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
      <label class="film-details__user-rating-label" for="rating-6">6</label>
    
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
      <label class="film-details__user-rating-label" for="rating-7">7</label>
    
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
      <label class="film-details__user-rating-label" for="rating-8">8</label>
    
      <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9">
      <label class="film-details__user-rating-label" for="rating-9">9</label>
    
      </div>
      </section>
      </div>
      </section>
      </div>`);
  }

  renderRating(isWatched) {
    if (document.body.contains(this.getElement())) {
      this.getElement().parentNode.removeChild(this.getElement());
    }

    if (isWatched) {
      this._onDataRating();
      render(this._container, this, RenderPosition.AFTERNODE);
      this._onSetRating();
      this._undoButton.addEventListener(`click`, this._removeRating);
    } else {
      this._removeRating();
    }
  }

  _onDataRating() {
    this._ratingButtons.forEach((button) => {
      if (this._filmCard.userRating === Number(button.value)) {
        button.checked = true;
      }
    });
  }

  _removeRating() {
    this._ratingButtons.forEach((button) => {
      button.checked = false;
    });
    this._filmCard.userRating = null;
  }

  _onSetRating() {
    this._ratingButtons.forEach((button) => {
      button.addEventListener(`click`, () => {
        this._filmCard.userRating = button.value;
      });
    });
  }
}
