import AbstractSmartComponent from './abstract-smart-component';

export default class Menu extends AbstractSmartComponent {
  constructor(filters) {
    super();
    this._watchlistCount = 0;
    this._historyCount = 0;
    this._favoritesCount = 0;
    this._filters = filters;
  }

  getTemplate() {
    this._calculateFilterCount();
    return (`<nav class="main-navigation">
             <a href="#all" id="all" class="main-navigation__item main-navigation__item--active">All movies</a>
             <a href="#watchlist" id="watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${this._watchlistCount}</span></a>
             <a href="#history" id="history" class="main-navigation__item">History <span class="main-navigation__item-count">${this._historyCount}</span></a>
             <a href="#favorites" id="favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${this._favoritesCount}</span></a>
             <a href="#stats" id=""stats class="main-navigation__item main-navigation__item--additional">Stats</a>
           </nav>`);
  }

  setFilterChangeHandler(handler) {
    this.getElement().querySelectorAll(`.main-navigation__item`).forEach((filter) => {
      filter.addEventListener(`click`, (evt) => {
        handler(evt.target.id);
      });
    });
  }

  _calculateFilterCount() {
    this._filters.forEach((filter) => {
      if (filter.name === `history`) {
        this._historyCount = filter.count;
      }
      if (filter.name === `favorites`) {
        this._favoritesCount = filter.count;
      }
      if (filter.name === `watchlist`) {
        this._watchlistCount = filter.count;
      }
    });
  }
}
