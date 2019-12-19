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
  }

  getTemplate() {
    return (`<ul class="sort">
             <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
             <li><a href="#" data-sort-type="${SortType.SORT_BY_DATE}" class="sort__button">Sort by date</a></li>
             <li><a href="#" data-sort-type="${SortType.SORT_BY_RATING}" class="sort__button">Sort by rating</a></li>
           </ul>`);
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (!evt.target.classList.contains(`sort__button`)) {
        return;
      }

      this._element.querySelectorAll(`.sort__button`).forEach((link) => {
        if (link.classList.contains(`sort__button--active`)) {
          link.classList.remove(`sort__button--active`);
        }
      });
      evt.target.classList.add(`sort__button--active`);

      const sortType = evt.target.dataset.sortType;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }
}
