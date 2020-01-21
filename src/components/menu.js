import AbstractSmartComponent from './abstract-smart-component';

export default class Menu extends AbstractSmartComponent {
  constructor(filters) {
    super();
    this._watchlistCount = 0;
    this._historyCount = 0;
    this._favoritesCount = 0;
    this._filters = filters;
    this._links = this.getElement().querySelectorAll(`.main-navigation__item`);
    this._setActiveLink();
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
    const allLinks = this.getElement().querySelectorAll(`.main-navigation__item`);
    const filters = [];
    allLinks.forEach((link) => {
      if (link.classList.contains(`main-navigation__item--additional`) === false) {
        filters.push(link);
      }
    });
    filters.forEach((filter) => {
      filter.addEventListener(`click`, (evt) => {
        handler(evt.target.id);
      });
    });
  }

  setShowStatisticHandler(handler) {
    this._links.forEach((link) => {
      link.addEventListener(`click`, handler);
    });
  }

  _setActiveLink() {
    this._links.forEach((link) => {
      link.addEventListener(`click`, (evt) => {
        this._links.forEach((filter) => {
          if (filter.classList.contains(`main-navigation__item--active`)) {
            filter.classList.remove(`main-navigation__item--active`);
          }
          evt.target.classList.add(`main-navigation__item--active`);
        });
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
