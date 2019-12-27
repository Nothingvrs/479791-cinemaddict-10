import PopupDetails from "../components/popup-details";
import FilmCard from "../components/card";
import {render, RenderPosition, togglePopup, replace} from "../utils/render";

const siteMainElement = document.querySelector(`.main`);

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmCardElement = null;
    this._popupElement = null;
  }

  render(card) {
    const oldFilmCard = this._filmCardElement;
    const oldPopup = this._popupElement;

    this._popupElement = new PopupDetails(card);
    this._filmCardElement = new FilmCard(card);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        togglePopup(this._popupElement, siteMainElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._filmCardElement.getOpenCard(() => {
      togglePopup(this._popupElement, siteMainElement);
      document.addEventListener(`keydown`, onEscKeyDown);
      this._popupElement.getClose(() => {
        togglePopup(this._popupElement, siteMainElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    });

    this._filmCardElement.setFavoriteButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite,
      }));
    });
    this._filmCardElement.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched,
      }));
    });
    this._filmCardElement.setWatchlistButtonClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isGoingToWatchlist: !card.isGoingToWatchlist,
      }));
    });

    if (oldPopup && oldFilmCard) {
      replace(this._filmCardElement, oldFilmCard);
      replace(this._popupElement, oldPopup);
    } else {
      render(this._container, this._filmCardElement, RenderPosition.BEFOREEND);
    }
  }
}

