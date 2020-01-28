import {FilterType, FilterTypeStatistic} from '../const.js';

const getWatchedMovies = (cards) => {
  return cards.filter((card) => card.isWatched);
};

const getWatchlistMovies = (cards) => {
  return cards.filter((card) => card.isInWatchlist);
};

const getFavoriteMovies = (cards) => {
  return cards.filter((card) => card.isFavorite);
};

const getAllMovies = (cards) => {
  return cards;
};

const getWatchedFilmsToday = (films) => {
  let now = new Date();
  let watchedFilmsByPeriod = [];
  const dateInitial = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  films.forEach((film) =>{
    const watchingDate = film.watchingDate;
    if (watchingDate.getFullYear() === dateInitial.getFullYear() &&
    watchingDate.getMonth() === dateInitial.getMonth() &&
    watchingDate.getDate() === dateInitial.getDate() &&
    film.isWatched) {
      watchedFilmsByPeriod.push(film);
    }
  });
  return watchedFilmsByPeriod;
};

const getWatchedFilmsWeek = (films) => {
  let now = new Date();
  let watchedFilmsByPeriod = [];
  const dateInitial = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6);
  films.forEach((film) =>{
    const watchingDate = film.watchingDate;
    if (watchingDate.getFullYear() === dateInitial.getFullYear() &&
      watchingDate.getMonth() === dateInitial.getMonth() &&
      watchingDate.getDate() >= dateInitial.getDate() &&
      film.isWatched) {
      watchedFilmsByPeriod.push(film);
    }
  });
  return watchedFilmsByPeriod;
};

const getWatchedFilmsMonth = (films) => {
  let now = new Date();
  let watchedFilmsByPeriod = [];
  const dateInitial = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  films.forEach((film) =>{
    const watchingDate = film.watchingDate;
    if (watchingDate.getFullYear() === dateInitial.getFullYear() &&
      watchingDate.getMonth() === dateInitial.getMonth() &&
      film.isWatched) {
      watchedFilmsByPeriod.push(film);
    }
  });
  return watchedFilmsByPeriod;
};

const getWatchedFilmsYear = (films) => {
  let now = new Date();
  let watchedFilmsByPeriod = [];
  const dateInitial = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  films.forEach((film) =>{
    const watchingDate = film.watchingDate;
    if (watchingDate.getFullYear() === dateInitial.getFullYear() &&
      film.isWatched) {
      watchedFilmsByPeriod.push(film);
    }
  });
  return watchedFilmsByPeriod;
};

export const getTasksByFilter = (cards, filterType) => {

  switch (filterType) {
    case FilterType.ALL:
      return getAllMovies(cards);
    case FilterType.WATCHLIST:
      return getWatchlistMovies(cards);
    case FilterType.FAVORITES:
      return getFavoriteMovies(cards);
    case FilterType.WATCHED:
      return getWatchedMovies(cards);
  }

  return cards;
};

export const getFilmsByFilterStatistic = (films, filterTypeStatistic) => {
  let watchedMovieByPeriod = [];
  switch (filterTypeStatistic) {
    case FilterTypeStatistic.ALL:
      watchedMovieByPeriod = getWatchedMovies(films);
      break;
    case FilterTypeStatistic.TODAY:
      watchedMovieByPeriod = getWatchedFilmsToday(films);
      break;
    case FilterTypeStatistic.WEEK:
      watchedMovieByPeriod = getWatchedFilmsWeek(films);
      break;
    case FilterTypeStatistic.MONTH:
      watchedMovieByPeriod = getWatchedFilmsMonth(films);
      break;
    case FilterTypeStatistic.YEAR:
      watchedMovieByPeriod = getWatchedFilmsYear(films);
  }
  return watchedMovieByPeriod;
};
