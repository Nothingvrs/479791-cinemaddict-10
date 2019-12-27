import {formatDate, Time} from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component';

export default class PopupDetails extends AbstractSmartComponent {
  constructor(filmDetails) {
    super();
    this._filmCard = filmDetails;
    this._isFavorite = this._filmCard.isFavorite;
    this._isWatched = this._filmCard.isWatched;
    this._isGoingToWatchlist = this._filmCard.isGoingToWatchlist;
    this._closeHandler = null;
    this._subscribeOnEvents();
  }

  getTemplate() {

    const isFilmWatched = this._filmCard.isWatched ? `checked` : ``;
    const isFilmGoingToWatchlist = this._filmCard.isGoingToWatchlist ? `checked` : ``;
    const isFilmFavorite = this._filmCard.isFavorite ? `checked` : ``;

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
                        <p class="film-details__total-rating">${this._filmCard.rating}</p>
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
                        <td class="film-details__term">Genres</td>
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
                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isFilmGoingToWatchlist}>
                  <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
          
                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isFilmWatched}>
                  <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
          
                  <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFilmFavorite}>
                  <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
                </section>
              </div>
          
            ${this._filmCard.isWatched ?
        ` <div class="form-details__middle-container">
      <section class="film-details__user-rating-wrap">
        <div class="film-details__user-rating-controls">
          <button class="film-details__watched-reset" type="button">Undo</button>
        </div>

        <div class="film-details__user-score">
          <div class="film-details__user-rating-poster">
            <img src="${this._filmCard.poster}" alt="film-poster" class="film-details__user-rating-img">
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
    </div>`
        : ``}
          
              <div class="form-details__bottom-container">
                <section class="film-details__comments-wrap">
                  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
          
                  <ul class="film-details__comments-list">
                    <li class="film-details__comment">
                      <span class="film-details__comment-emoji">
                        <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">
                      </span>
                      <div>
                        <p class="film-details__comment-text">Interesting setting and a good cast</p>
                        <p class="film-details__comment-info">
                          <span class="film-details__comment-author">Tim Macoveev</span>
                          <span class="film-details__comment-day">2019/12/31 23:59</span>
                          <button class="film-details__comment-delete">Delete</button>
                        </p>
                      </div>
                    </li>
                    <li class="film-details__comment">
                      <span class="film-details__comment-emoji">
                        <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji">
                      </span>
                      <div>
                        <p class="film-details__comment-text">Booooooooooring</p>
                        <p class="film-details__comment-info">
                          <span class="film-details__comment-author">John Doe</span>
                          <span class="film-details__comment-day">2 days ago</span>
                          <button class="film-details__comment-delete">Delete</button>
                        </p>
                      </div>
                    </li>
                    <li class="film-details__comment">
                      <span class="film-details__comment-emoji">
                        <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji">
                      </span>
                      <div>
                        <p class="film-details__comment-text">Very very old. Meh</p>
                        <p class="film-details__comment-info">
                          <span class="film-details__comment-author">John Doe</span>
                          <span class="film-details__comment-day">2 days ago</span>
                          <button class="film-details__comment-delete">Delete</button>
                        </p>
                      </div>
                    </li>
                    <li class="film-details__comment">
                      <span class="film-details__comment-emoji">
                        <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji">
                      </span>
                      <div>
                        <p class="film-details__comment-text">Almost two hours? Seriously?</p>
                        <p class="film-details__comment-info">
                          <span class="film-details__comment-author">John Doe</span>
                          <span class="film-details__comment-day">Today</span>
                          <button class="film-details__comment-delete">Delete</button>
                        </p>
                      </div>
                    </li>
                  </ul>
          
                  <div class="film-details__new-comment">
                    <div for="add-emoji" class="film-details__add-emoji-label"></div>
          
                    <label class="film-details__comment-label">
                      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
                    </label>
          
                    <div class="film-details__emoji-list">
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping">
                      <label class="film-details__emoji-label" for="emoji-smile">
                        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                      </label>
          
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
                      <label class="film-details__emoji-label" for="emoji-sleeping">
                        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                      </label>
          
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
                      <label class="film-details__emoji-label" for="emoji-gpuke">
                        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                      </label>
          
                      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
                      <label class="film-details__emoji-label" for="emoji-angry">
                        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                      </label>
                    </div>
                  </div>
                </section>
              </div>
            </form>
          </section>`);
  }

  getClose(handler) {
    this._element.querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
    this._closeHandler = handler;
  }

  getCloseListenerRemove() {
    this._element.querySelector(`.film-details__close-btn`).removeEventListener(`click`, this._closeHandler);
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`#favorite`)
      .addEventListener(`change`, () => {
        this._isFavorite = !this._isFavorite;
        this.saveData();
        this.rerender();
      });

    element.querySelector(`#watchlist`)
      .addEventListener(`change`, () => {
        this._isGoingToWatchlist = !this._isGoingToWatchlist;
        this.saveData();
        this.rerender();
      });

    element.querySelector(`#watched`)
      .addEventListener(`change`, () => {
        this._isWatched = !this._isWatched;
        this.saveData();
        this.rerender();
      });
  }

  recoveryListeners() {
    this._subscribeOnEvents();
    this.getClose(this._closeHandler);
  }

  rerender() {
    super.rerender();
  }

  saveData() {
    this._filmCard.isFavorite = this._isFavorite;
    this._filmCard.isGoingToWatchlist = this._isGoingToWatchlist;
    this._filmCard.isWatched = this._isWatched;
  }
}
