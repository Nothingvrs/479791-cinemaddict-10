import PopupDetails from '../components/popup-details';
import FilmCard from '../components/card';
import {render, RenderPosition, togglePopup} from '../utils/render';
import PopupAddToWatchlist from '../components/popup-add-to-watchlist-button';
import PopupFavorite from '../components/popup-favorite-button';
import PopupWatched from '../components/popup-watched-button';
import CardFavorite from '../components/card-favorite-button';
import CardWatched from '../components/card-watched-button';
import CardAddToWatchlist from "../components/card-add-to-watchlist-button";
const siteBodyElement = document.querySelector(`body`);

export default class MovieController {
  constructor(container, card) {
    this._card = card;
    this._container = container;
    this._popupElement = new PopupDetails(this._card);
    this._filmCardElement = new FilmCard(this._card);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    const bottomContainer = this._popupElement.getElement().querySelector(`.form-details__bottom-container`);
    this._cardFavoriteElement = new CardFavorite(this._card);
    this._cardWatchedElement = new CardWatched(this._card, bottomContainer);
    this._cardAddToWatchlistElement = new CardAddToWatchlist(this._card);
    this._popupFavoriteElement = new PopupFavorite(this._card);
    this._popupAddToWatchlistElement = new PopupAddToWatchlist(this._card);
    this._popupWatchedElement = new PopupWatched(this._card, bottomContainer);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  render() {
    const controlsPopup = this._popupElement.getElement().querySelector(`.film-details__controls`);
    render(controlsPopup, this._popupAddToWatchlistElement, RenderPosition.BEFOREEND);
    render(controlsPopup, this._popupWatchedElement, RenderPosition.BEFOREEND);
    render(controlsPopup, this._popupFavoriteElement, RenderPosition.BEFOREEND);

    const controlsCard = this._filmCardElement.getElement().querySelector(`.film-card__controls`);
    render(controlsCard, this._cardAddToWatchlistElement, RenderPosition.BEFOREEND);
    render(controlsCard, this._cardWatchedElement, RenderPosition.BEFOREEND);
    render(controlsCard, this._cardFavoriteElement, RenderPosition.BEFOREEND);

    this._filmCardElement.getOpenCard(() => {
      this._openPopup();
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._popupElement.getClose(() => {
        this._closePopup(this._card);
        document.removeEventListener(`keydown`, this._onEscKeyDown);
        this._popupElement.getCloseListenerRemove();
      });
    });

    render(this._container, this._filmCardElement, RenderPosition.BEFOREEND);
  }

  _openPopup() {
    togglePopup(this._popupElement, siteBodyElement);
    this._popupFavoriteElement.rerender();
    this._popupAddToWatchlistElement.rerender();
    this._popupWatchedElement.rerender();
  }

  _closePopup() {
    togglePopup(this._popupElement, siteBodyElement);
    this._cardFavoriteElement.rerender();
    this._cardAddToWatchlistElement.rerender();
    this._cardWatchedElement.rerender();
  }
}

