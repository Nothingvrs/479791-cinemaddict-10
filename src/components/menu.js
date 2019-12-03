
export const createMenuElement = (cards) => {

  let watchlistCount = 0;
  let historyCount = 0;
  let favoritesCount = 0;

  for (const card of cards) {
    if (card.isGoingToWatchlist) {
      watchlistCount++;
    }
    if (card.isWatched) {
      historyCount++;
    }
    if (card.isFavorite) {
      favoritesCount++;
    }
  }

  return (`<nav class="main-navigation">
             <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
             <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
             <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyCount}</span></a>
             <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
             <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
           </nav>`);
};
