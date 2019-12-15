import AbstractComponent from './abstract-component';

export default class Menu extends AbstractComponent {
  constructor(cards) {
    super();
    this._watchlistCount = 0;
    this._historyCount = 0;
    this._favoritesCount = 0;
    this._cards = cards;
  }

  getTemplate() {
    this.filmFeatures();
    return (`<nav class="main-navigation">
             <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
             <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this._watchlistCount}</span></a>
             <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${this._historyCount}</span></a>
             <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._favoritesCount}</span></a>
             <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
           </nav>`);
  }

  filmFeatures() {
    this._cards.forEach((card) => {
      if (card.isGoingToWatchlist) {
        this._watchlistCount++;
      }
      if (card.isWatched) {
        this._historyCount++;
      }
      if (card.isFavorite) {
        this._favoritesCount++;
      }
    });
  }
}
