import {formatDate, Time} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component';

export default class PopupDetails extends AbstractSmartComponent {
  constructor(filmDetails) {
    super();
    this._filmCard = filmDetails;
    this._closeHandler = null;
  }

  getTemplate() {
    const HowManyGenres = (this._filmCard.genre.length > 1) ? `Genres` : `Genre`;

    return (`<section class="film-details">
            <form class="film-details__inner" action="" method="get">
              <div class="form-details__top-container">
                <div class="film-details__close">
                  <button class="film-details__close-btn" type="button">close</button>
                </div>
                <div class="film-details__info-wrap">
                  <div class="film-details__poster">
                    <img class="film-details__poster-img" src=${this._filmCard.poster} alt="">
          
                    <p class="film-details__age">${this._filmCard.restrictions}+</p>
                  </div>
          
                  <div class="film-details__info">
                    <div class="film-details__info-head">
                      <div class="film-details__title-wrap">
                        <h3 class="film-details__title">${this._filmCard.title}</h3>
                        <p class="film-details__title-original">Original: ${this._filmCard.title}</p>
                      </div>
          
                      <div class="film-details__rating">
                        <p class="film-details__total-rating">${this._filmCard.totalRating}</p>
                      </div>
                    </div>
          
                    <table class="film-details__table">
                      <tr class="film-details__row">
                        <td class="film-details__term">Director</td>
                        <td class="film-details__cell">${this._filmCard.director}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Writers</td>
                        <td class="film-details__cell">${this._filmCard.writers}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Actors</td>
                        <td class="film-details__cell">${this._filmCard.actors}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Release Date</td>
                        <td class="film-details__cell">${formatDate(this._filmCard.premiere)}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Runtime</td>
                        <td class="film-details__cell">${Math.floor(this._filmCard.duration / Time.HOUR)}h&nbsp;${this._filmCard.duration % Time.HOUR}m</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Country</td>
                        <td class="film-details__cell">${this._filmCard.country}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">${HowManyGenres}</td>
                        <td class="film-details__cell">
                          <span class="film-details__genre">${this._filmCard.genre}</span>
                      </tr>
                    </table>
          
                    <p class="film-details__film-description">
                      ${this._filmCard.description}
                    </p>
                  </div>
                </div>
          
                <section class="film-details__controls">
                </section>
              </div>`);
  }

  getClose(handler) {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._closeHandler = handler;
  }

  getCloseListenerRemove() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._closeHandler);
  }
}
