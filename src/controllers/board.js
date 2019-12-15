import PopupDetails from '../components/popup-details';
import FilmCard from '../components/card';
import {togglePopup, render, RenderPosition} from '../utils/render';
import LoadMoreButton from '../components/button-show-more';
import NoMovies from '../components/no-movies';
import ExtraFilms from "../components/extra";

const FILM_CARD_EXTRA_AMOUNT = 2;
const FILM_CARD_AMOUNT_BY_BUTTON = 5;
const FILM_CARD_AMOUNT_ON_START = 5;

const siteMainElement = document.querySelector(`.main`);

const renderFilmCard = (cardListElement, card) => {
  const popupElement = new PopupDetails(card);
  const filmCardElement = new FilmCard(card);

  render(cardListElement, filmCardElement, RenderPosition.BEFOREEND);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      togglePopup(popupElement, siteMainElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardElement.getOpenCard(() => {
    togglePopup(popupElement, siteMainElement);
    document.addEventListener(`keydown`, onEscKeyDown);
    popupElement.getClose(() => {
      togglePopup(popupElement, siteMainElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  });
};

export default class BoardController {
  constructor(container, board, showMoreBoard) {
    this._container = container;
    this._showMoreBoard = showMoreBoard;
    this._board = board;
    this._loadMoreButton = new LoadMoreButton();
  }

  renderFilmCards(filmCards) {
    if (filmCards.length) {
      renderFilmCard(this._container, filmCards[0]);
      let showingCardsCount = FILM_CARD_AMOUNT_ON_START;
      filmCards.slice(1, showingCardsCount).forEach((card) => renderFilmCard(this._container, card));

      render(this._showMoreBoard, this._loadMoreButton, RenderPosition.BEFOREEND);

      const loadMoreButton = this._showMoreBoard.querySelector(`.films-list__show-more`);
      loadMoreButton.addEventListener(`click`, () => {
        const prevCardsCount = showingCardsCount;
        showingCardsCount = showingCardsCount + FILM_CARD_AMOUNT_BY_BUTTON;

        filmCards.slice(prevCardsCount, showingCardsCount)
          .forEach((card) => renderFilmCard(this._container, card));

        if (showingCardsCount >= filmCards.length) {
          loadMoreButton.remove();
        }
      });
    } else {
      render(this._container, new NoMovies(), RenderPosition.BEFOREEND);
    }
  }

  renderTopRatingFilms(cards) {
    const topRatingFilms = cards
      .sort((film1, film2) => (film2.rating - film1.rating))
      .filter((film) => film.rating !== 0)
      .slice(0, FILM_CARD_EXTRA_AMOUNT);
    if (topRatingFilms.length > 0) {
      render(this._board, new ExtraFilms(`Top rated`), RenderPosition.BEFOREEND);
      const extraFilmsContainerElement = document.querySelector(`.films-list--extra`);
      const extraFilmsBoardElement = extraFilmsContainerElement.querySelector(`.films-list__container`);
      topRatingFilms.map((film) => (renderFilmCard(extraFilmsBoardElement, film)));
    }
  }

  renderTopCommentsFilms(cards) {
    const topCommentsFilms = cards
      .sort((film1, film2) => (film2.comments - film1.comments))
      .filter((film) => film.comments !== 0)
      .slice(0, FILM_CARD_EXTRA_AMOUNT);
    if (topCommentsFilms.length > 0) {
      render(this._board, new ExtraFilms(`MostCommented`), RenderPosition.BEFOREEND);
      const extraFilmsContainerElement = document.querySelectorAll(`.films-list--extra`);
      const extraFilmsBoardElement = extraFilmsContainerElement[1].querySelector(`.films-list__container`);
      topCommentsFilms.map((film) => (renderFilmCard(extraFilmsBoardElement, film)));
    }
  }
}
