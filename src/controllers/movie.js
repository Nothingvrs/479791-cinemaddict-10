import PopupDetails from "../components/popup-details";
import FilmCard from "../components/card";
import {render, RenderPosition, togglePopup, replace} from "../utils/render";

const siteBodyElement = document.querySelector(`body`);

export default class MovieController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._filmCardElement = null;
    this._popupElement = null;
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      togglePopup(this._popupElement, siteBodyElement);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  render(card) {
    const oldFilmCard = this._filmCardElement;
    const oldPopup = this._popupElement;

    this._popupElement = new PopupDetails(card);
    this._filmCardElement = new FilmCard(card);

    this._filmCardElement.getOpenCard(() => {
      this._openPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._popupElement.getClose(() => {
        this._closePopup(card);
        document.removeEventListener(`keydown`, this._onEscKeyDown);
        this._popupElement.getCloseListenerRemove();
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

  _openPopup() {
    togglePopup(this._popupElement, siteBodyElement);
  }

  _closePopup() {
    togglePopup(this._popupElement, siteBodyElement);
  }

}

