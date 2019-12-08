import {createElement} from "../utils";

export default class ExtraFilms {
  constructor(title, filmsMarkup) {
    this._element = null;
    this._title = title;
    this._filmsMarkup = filmsMarkup;
  }

  getTemplate() {
    return (`<section class="films-list--extra">
            <h2 class="films-list__title">${this._title}</h2>
            <div class="films-list__container">
                ${this._filmsMarkup}
            </div>
            </section>`);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
