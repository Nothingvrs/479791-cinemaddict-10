import {render, RenderPosition, remove} from '../utils/render';
import LoadMoreButton from '../components/button-show-more';
import NoMovies from '../components/no-movies';
import ExtraFilms from "../components/extra";
import Sort, {SortType} from '../components/sorting';
import FilmCardList from '../components/film-card-list';
import MovieController from './movie';

const FILM_CARD_EXTRA_AMOUNT = 2;
const FILM_CARD_AMOUNT_BY_BUTTON = 5;
const FILM_CARD_AMOUNT_ON_START = 5;

const siteMainElement = document.querySelector(`.main`);

const renderCards = (cardListElement, cards) => {
  cards.map((card) => {
    const movieController = new MovieController(cardListElement, card);
    movieController.render();
  });
};

export default class BoardController {
  constructor() {
    this._container = null;
    this._showMoreBoard = null;
    this._board = null;
    this._cards = [];
    this._loadMoreButton = new LoadMoreButton();
    this._showingCardsCount = null;
    this.sortComponent = new Sort();
    this._sortedCards = [];
    this._showedCardsControllers = [];
  }

  renderFilmCards(filmCards) {
    this._cards = filmCards;
    if (this._cards.length) {
      render(siteMainElement, this.sortComponent, RenderPosition.BEFOREEND);
      render(siteMainElement, new FilmCardList(), RenderPosition.BEFOREEND);

      const siteFilmBoardElement = siteMainElement.querySelector(`.films`);
      const siteFilmListElement = siteFilmBoardElement.querySelector(`.films-list`);
      this._container = siteFilmListElement.querySelector(`.films-list__container`);
      this._showMoreBoard = siteFilmListElement;
      this._board = siteFilmBoardElement;
      this._showingCardsCount = FILM_CARD_AMOUNT_ON_START;
      const newCards = renderCards(
          this._container,
          this._cards.slice(0, this._showingCardsCount),
          this._onViewChange());
      this._showedCardsControllers = this._showedCardsControllers.concat(newCards);

      this.renderLoadMoreButton(this._cards);
      this.sortComponent.setSortTypeChangeHandler((sortType) => {
        this.sortCards(this._cards, sortType);
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
    this._loadMoreButton.setClickHandler(() => {
      const prevCardsCount = this._showingCardsCount;
      this._showingCardsCount = this._showingCardsCount + FILM_CARD_AMOUNT_BY_BUTTON;

      const newCards = renderCards(
          this._container,
          this._cards.slice(prevCardsCount, this._showingCardsCount),
          this._onViewChange());
      this._showedCardsControllers = this._showedCardsControllers.concat(newCards);

      if (this._showingCardsCount >= filmCards.length) {
        loadMoreButton.remove();
      }
    });
  }

  sortCards(cards, sortType) {
    switch (sortType) {
      case SortType.SORT_BY_DATE:
        this._sortedCards = cards.slice().sort((a, b) => b.premiere - a.premiere);
        break;
      case SortType.SORT_BY_RATING:
        this._sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        this._sortedCards = cards.slice(0, this._showingCardsCount);
        break;
    }

    this._container.innerHTML = ``;

    renderCards(this._container, this._sortedCards);

    if (sortType === SortType.DEFAULT) {
      this.renderLoadMoreButton(cards, this._showingCardsCount, this._showMoreBoard);
    } else {
      remove(this._loadMoreButton);
    }
  }

  _onViewChange() {
    this._showedCardsControllers.forEach((it) => it.setDefaultView());
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
      renderCards(extraFilmsBoardElement, topRatingFilms, this._onViewChange());
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
      renderCards(extraFilmsBoardElement, topCommentsFilms, this._onViewChange());
    }
  }
}
