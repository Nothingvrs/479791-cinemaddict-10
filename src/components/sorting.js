import AbstractComponent from './abstract-component';

export const SortType = {
  SORT_BY_DATE: `sort-by-date`,
  SORT_BY_RATING: `sort-by-rating`,
  DEFAULT: `default`,
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._currenSortType = SortType.DEFAULT;
    this._sortButtonActive = null;
  }

  getTemplate() {
    return (`<ul class="sort">
             <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
             <li><a href="#" data-sort-type="${SortType.SORT_BY_DATE}" class="sort__button">Sort by date</a></li>
             <li><a href="#" data-sort-type="${SortType.SORT_BY_RATING}" class="sort__button">Sort by rating</a></li>
           </ul>`);
  }

  setSortTypeChangeHandler(handler) {
    this._sortButtonActive = this._element.querySelector(`.sort__button--active`);
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`sort__button`)) {
        return;
      }

      this._sortButtonActive.classList.remove(`sort__button--active`);
      this._sortButtonActive = evt.target;
      this._sortButtonActive.classList.add(`sort__button--active`);


      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
