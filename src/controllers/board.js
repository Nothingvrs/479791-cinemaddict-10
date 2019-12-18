import PopupDetails from '../components/popup-details';
import FilmCard from '../components/card';
import {togglePopup, render, RenderPosition, remove} from '../utils/render';
import LoadMoreButton from '../components/button-show-more';
import NoMovies from '../components/no-movies';
import ExtraFilms from "../components/extra";
import Sort, {SortType} from '../components/sorting';
import FilmCardList from '../components/film-card-list';

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

const renderCards = (cardListElement, cards) => {
  cards.forEach((task) => {
    renderFilmCard(cardListElement, task);
  });
};

export default class BoardController {
  constructor() {
    this._container = null;
    this._showMoreBoard = null;
    this._board = null;
    this._loadMoreButton = new LoadMoreButton();
    this._showingCardsCount = null;
    this.sortComponent = new Sort();
    this._sortedTasks = [];
  }

  renderFilmCards(filmCards) {
    if (filmCards.length) {
      render(siteMainElement, this.sortComponent, RenderPosition.BEFOREEND);
      render(siteMainElement, new FilmCardList(), RenderPosition.BEFOREEND);
      const siteFilmBoardElement = siteMainElement.querySelector(`.films`);
      const siteFilmListElement = siteFilmBoardElement.querySelector(`.films-list`);
      const siteFilmContainer = siteFilmListElement.querySelector(`.films-list__container`);
      this._container = siteFilmContainer;
      this._showMoreBoard = siteFilmListElement;
      this._board = siteFilmBoardElement;
      renderFilmCard(this._container, filmCards[0]);
      this._showingCardsCount = FILM_CARD_AMOUNT_ON_START;
      filmCards.slice(1, this._showingCardsCount).forEach((card) => renderFilmCard(this._container, card));
      this.renderLoadMoreButton(filmCards);
      this.sortComponent.setSortTypeChangeHandler((sortType) => {
        this.sortCards(filmCards, sortType);
      });
    } else {
      render(this._container, new NoMovies(), RenderPosition.BEFOREEND);
    }
  }

  renderLoadMoreButton(filmCards) {
    if (this._showingCardsCount >= filmCards.length) {
      return;
    }

    render(this._showMoreBoard, this._loadMoreButton, RenderPosition.BEFOREEND);

    const loadMoreButton = this._showMoreBoard.querySelector(`.films-list__show-more`);
    loadMoreButton.addEventListener(`click`, () => {
      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + FILM_CARD_AMOUNT_BY_BUTTON;

      filmCards.slice(prevCardsCount, this._showingCardsCount)
        .forEach((card) => renderFilmCard(this._container, card));

      if (this._showingCardsCount >= filmCards.length) {
        loadMoreButton.remove();
      }
    });
  }

  sortCards(cards, sortType) {
    switch (sortType) {
      case SortType.SORT_BY_DATE:
        this._sortedTasks = cards.slice().sort((a, b) => b.premiere - a.premiere);
        break;
      case SortType.SORT_BY_RATING:
        this._sortedTasks = cards.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        this._sortedTasks = cards.slice(0, this._showingCardsCount);
        break;
    }

    this._container.innerHTML = ``;

    renderCards(this._container, this._sortedTasks);

    if (sortType === SortType.DEFAULT) {
      this.renderLoadMoreButton(cards, this._showingCardsCount, this._showMoreBoard);
    } else {
      remove(this._loadMoreButton);
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
