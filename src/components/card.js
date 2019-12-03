import {Time} from "../utils";

export const createFilmCardElement = (filmCard) => {
  const {title, rating, year, duration, genre, poster, description, comments, isFavorite, isWatched, isGoingToWatchList} = filmCard;

  const favorite = () => {
    return (isFavorite) ? `film-card__controls-item--favorite` : ``;
  };

  const watched = () => {
    return (isWatched) ? `film-card__controls-item--favorite` : ``;
  };

  const watchList = () => {
    return (isGoingToWatchList) ? `film-card__controls-item--favorite` : ``;
  };

  return (`<article class="film-card">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${year}</span>
              <span class="film-card__duration">${Math.round(duration / Time.HOUR)}h&nbsp;${duration % Time.HOUR}m</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src=${poster} alt="" class="film-card__poster">
            <p class="film-card__description">${description}</p>
            <a class="film-card__comments">${comments} comments</a>
            <form class="film-card__controls">
              <button class="film-card__controls-item button ${favorite()}">Add to watchlist</button>
              <button class="film-card__controls-item button ${watched()}">Mark as watched</button>
              <button class="film-card__controls-item button ${watchList()}">Mark as favorite</button>
            </form>
          </article>`);
};
