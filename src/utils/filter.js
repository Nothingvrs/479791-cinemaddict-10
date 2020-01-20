import {FilterType, FilterTypeStatistic} from '../const.js';

const getWatchedMovies = (cards) => {
  return cards.filter((card) => card.isWatched);
};

const getWatchlistMovies = (cards) => {
  return cards.filter((card) => card.isGoingToWatchlist);
};

const getFavoriteMovies = (cards) => {
  return cards.filter((card) => card.isFavorite);
};

const getAllMovies = (cards) => {
  return cards;
};

const getWatchedFilmsToday = (films) => {
  return films.filter((film) => film.viewingDate === `today` && film.isWatched);
};

const getWatchedFilmsWeek = (films) => {
  return films.filter((film) => film.viewingDate === `week` && film.isWatched);
};

const getWatchedFilmsMonth = (films) => {
  return films.filter((film) => film.viewingDate === `month` && film.isWatched);
};

const getWatchedFilmsYear = (films) => {
  return films.filter((film) => film.viewingDate === `year` && film.isWatched);
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
  switch (filterTypeStatistic) {
    case FilterTypeStatistic.ALL:
      return getWatchedMovies(films);
    case FilterTypeStatistic.TODAY:
      return getWatchedFilmsToday(films);
    case FilterTypeStatistic.WEEK:
      return getWatchedFilmsWeek(films);
    case FilterTypeStatistic.MONTH:
      return getWatchedFilmsMonth(films);
    case FilterTypeStatistic.YEAR:
      return getWatchedFilmsYear(films);
  }
  return films;
};
