import {formatDate, Time} from "../utils";

export const createFilmDetailsPopupElement = (filmDetails) => {
  const {title, rating, duration, genre, poster, director, description, isFavorite, isWatched, isGoingToWatchList, actors, restrictions, premiere, country} = filmDetails;

  const favorite = () => {
    return (isFavorite) ? `film-card__controls-item--favorite` : ``;
  };

  const watched = () => {
    return (isWatched) ? `film-card__controls-item--favorite` : ``;
  };

  const watchList = () => {
    return (isGoingToWatchList) ? `film-card__controls-item--favorite` : ``;
  };

  return (`<section class="film-details">
            <form class="film-details__inner" action="" method="get">
              <div class="form-details__top-container">
                <div class="film-details__close">
                  <button class="film-details__close-btn" type="button">close</button>
                </div>
                <div class="film-details__info-wrap">
                  <div class="film-details__poster">
                    <img class="film-details__poster-img" src=${poster} alt="">
          
                    <p class="film-details__age">${restrictions}+</p>
                  </div>
          
                  <div class="film-details__info">
                    <div class="film-details__info-head">
                      <div class="film-details__title-wrap">
                        <h3 class="film-details__title">${title}</h3>
                        <p class="film-details__title-original">Original: ${title}</p>
                      </div>
          
                      <div class="film-details__rating">
                        <p class="film-details__total-rating">${rating}</p>
                      </div>
                    </div>
          
                    <table class="film-details__table">
                      <tr class="film-details__row">
                        <td class="film-details__term">Director</td>
                        <td class="film-details__cell">${director}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Writers</td>
                        <td class="film-details__cell">${actors}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Actors</td>
                        <td class="film-details__cell">${actors}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Release Date</td>
                        <td class="film-details__cell">${formatDate(premiere)}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Runtime</td>
                        <td class="film-details__cell">${Math.round(duration / Time.HOUR)}h&nbsp;${duration % Time.HOUR}m</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Country</td>
                        <td class="film-details__cell">${country}</td>
                      </tr>
                      <tr class="film-details__row">
                        <td class="film-details__term">Genres</td>
                        <td class="film-details__cell">
                          <span class="film-details__genre">${genre}</span>
                          <span class="film-details__genre">${genre}</span>
                          <span class="film-details__genre">${genre}</span></td>
                      </tr>
                    </table>
          
                    <p class="film-details__film-description">
                      ${description}
                    </p>
                  </div>
                </div>
          
                <section class="film-details__controls">
                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
                  <label for="watchlist" class="film-details__control-label ${watchList()}">Add to watchlist</label>
          
                  <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
                  <label for="watched" class="film-details__control-label ${watched()}">Already watched</label>
          
                  <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
                  <label for="favorite" class="film-details__control-label ${favorite()}">Add to favorites</label>
                </section>
              </div>
          
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
};
