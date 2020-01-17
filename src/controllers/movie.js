import PopupDetails from '../components/popup-details';
import FilmCard from '../components/card';
import {render, RenderPosition, togglePopup} from '../utils/render';
import PopupAddToWatchlist from '../components/popup-add-to-watchlist-button';
import PopupFavorite from '../components/popup-favorite-button';
import PopupWatched from '../components/popup-watched-button';
import CardFavorite from '../components/card-favorite-button';
import CardWatched from '../components/card-watched-button';
import CardAddToWatchlist from '../components/card-add-to-watchlist-button';
import CommentsController from './comments';

const siteBodyElement = document.querySelector(`body`);

export default class MovieController {
  constructor(container, card, movieModel) {
    this._card = card;
    this._movieModel = movieModel;
    this._container = container;
    this._popupElement = new PopupDetails(this._card);
    this._filmCardElement = new FilmCard(this._card);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onDataChangeFavoriteFilter = this._onDataChangeFavoriteFilter.bind(this);
    this._onDataChangeWatchedFilter = this._onDataChangeWatchedFilter.bind(this);
    this._onDataChangeWatchlistFilter = this._onDataChangeWatchlistFilter.bind(this);
    this._onCtrlEnterKeyDown = this._onCtrlEnterKeyDown.bind(this);
    this._topContainer = this._popupElement.getElement().querySelector(`.form-details__top-container`);
    this._PopupInnerContainer = this._popupElement.getElement().querySelector(`form`);
    this._cardFavoriteElement = new CardFavorite(this._card, this._onDataChangeFavoriteFilter);
    this._cardWatchedElement = new CardWatched(this._card, this._topContainer, this._onDataChangeWatchedFilter);
    this._cardAddToWatchlistElement = new CardAddToWatchlist(this._card, this._onDataChangeWatchlistFilter);
    this._popupFavoriteElement = new PopupFavorite(this._card, this._onDataChangeFavoriteFilter);
    this._popupAddToWatchlistElement = new PopupAddToWatchlist(this._card, this._onDataChangeWatchlistFilter);
    this._popupWatchedElement = new PopupWatched(this._card, this._topContainer, this._onDataChangeWatchedFilter);
    this._commentsElement = new CommentsController(this._PopupInnerContainer, this._movieModel);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._closePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _onCtrlEnterKeyDown(evt) {
    if ((evt.ctrlKey) && ((evt.keyCode === 0xA) || (evt.keyCode === 0xD))) {
      this._commentsElement.onCommentAdd();
    }
  }

  render() {
    this._commentsElement._renderComments();

    const controlsPopup = this._popupElement.getElement().querySelector(`.film-details__controls`);
    render(controlsPopup, this._popupAddToWatchlistElement, RenderPosition.BEFOREEND);
    render(controlsPopup, this._popupWatchedElement, RenderPosition.BEFOREEND);
    render(controlsPopup, this._popupFavoriteElement, RenderPosition.BEFOREEND);

    const controlsCard = this._filmCardElement.getElement().querySelector(`.film-card__controls`);
    render(controlsCard, this._cardAddToWatchlistElement, RenderPosition.BEFOREEND);
    render(controlsCard, this._cardWatchedElement, RenderPosition.BEFOREEND);
    render(controlsCard, this._cardFavoriteElement, RenderPosition.BEFOREEND);

    this._filmCardElement.getOpenCard(() => {
      this._isOpenPopup();
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
    document.addEventListener(`keydown`, this._onCtrlEnterKeyDown);
  }

  _closePopup() {
    togglePopup(this._popupElement, siteBodyElement);
    this._cardFavoriteElement.rerender();
    this._cardAddToWatchlistElement.rerender();
    this._cardWatchedElement.rerender();
    document.removeEventListener(`keydown`, this._onCtrlEnterKeyDown);
  }

  _isOpenPopup() {
    if (document.body.querySelector(`.film-details`)) {
      document.body.querySelector(`.film-details`).parentNode.removeChild(document.body.querySelector(`.film-details`));
    }
  }

  _onDataChangeFavoriteFilter(cardController, oldData, newData) {
    const isSuccess = this._movieModel.updateCard(oldData.id, newData);

    if (isSuccess) {
      oldData.isFavorite = newData.isFavorite;
      cardController.rerender();
    }
  }

  _onDataChangeWatchedFilter(cardController, oldData, newData) {
    const isSuccess = this._movieModel.updateCard(oldData.id, newData);

    if (isSuccess) {
      oldData.isWatched = newData.isWatched;
      cardController.rerender();
    }
  }

  _onDataChangeWatchlistFilter(cardController, oldData, newData) {
    const isSuccess = this._movieModel.updateCard(oldData.id, newData);

    if (isSuccess) {
      oldData.isGoingToWatchlist = newData.isGoingToWatchlist;
      cardController.rerender();
    }
  }
}
