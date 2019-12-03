import {Time} from "../utils";

export const createFilmCardElement = (filmCard) => {

  const getIsFavoriteClass = () => {
    return filmCard.isFavorite ? `film-card__controls-item--favorite` : ``;
  };

  const getIsWatchedClass = () => {
    return filmCard.isWatched ? `film-card__controls-item--favorite` : ``;
  };

  const getIsWatchlist = () => {
    return filmCard.isGoingToWatchlist ? `film-card__controls-item--favorite` : ``;
  };

  return (`<article class="film-card">
            <h3 class="film-card__title">${filmCard.title}</h3>
            <p class="film-card__rating">${filmCard.rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${filmCard.year}</span>
              <span class="film-card__duration">${Math.floor(filmCard.duration / Time.HOUR)}h&nbsp;${filmCard.duration % Time.HOUR}m</span>
              <span class="film-card__genre">${filmCard.genre}</span>
            </p>
            <img src=${filmCard.poster} alt="" class="film-card__poster">
            <p class="film-card__description">${filmCard.description}</p>
            <a class="film-card__comments">${filmCard.comments} comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button ${getIsWatchlist()}">Add to watchlist</button>
              <button class="film-card__controls-item button ${getIsWatchedClass()}">Mark as watched</button>
              <button class="film-card__controls-item button ${getIsFavoriteClass()}">Mark as favorite</button>
            </form>
          </article>`);
};
