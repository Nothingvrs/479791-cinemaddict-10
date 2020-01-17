import {FilterType} from '../const.js';

export const getWatchedMovies = (cards) => {
  return cards.filter((card) => card.isWatched);
};

export const getWatchlistMovies = (cards) => {
  return cards.filter((card) => card.isGoingToWatchlist);
};

export const getFavoriteMovies = (cards) => {
  return cards.filter((card) => card.isFavorite);
};

export const getAllMovies = (cards) => {
  return cards;
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
