import PopupFavorite from "./popup-favorite-button";

export default class CardFavorite extends PopupFavorite {

  getTemplate() {
    const getIsFavoriteClass = this._filmCard.isFavorite ? `film-card__controls-item--active` : ``;

    return (`<button class="film-card__controls-item button ${getIsFavoriteClass} film-card__controls-item--favorite ">Mark as favorite</button>`);
  }

  _subscribeOnEvent() {
    this.getElement().addEventListener(`click`, () => {
      this._saveAndRerender();
    });
  }
}
