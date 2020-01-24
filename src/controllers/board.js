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

const renderCards = (cardListElement, cards, movieModel) => {
  return cards.map((card) => {
    const movieController = new MovieController(cardListElement, card, movieModel);
    movieController.render();

    return movieController;
  });
};

export default class BoardController {
  constructor(movieModel) {
    this._container = null;
    this._movieModel = movieModel;
    this._board = null;
    this._loadMoreButton = new LoadMoreButton();
    this._showingCardsCount = null;
    this._sortComponent = new Sort();
    this._cardList = new FilmCardList();
    this._showedCardsControllers = [];
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);
    this._onLoadMoreButtonClick = this._onLoadMoreButtonClick.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._movieModel.setFilterChangeHandler(this._onFilterChange);
  }

  renderFilmCards() {
    const cards = this._movieModel.getCards();
    if (cards.length) {
      render(siteMainElement, this._sortComponent, RenderPosition.BEFOREEND);
      render(siteMainElement, this._cardList, RenderPosition.BEFOREEND);

      const siteFilmBoardElement = siteMainElement.querySelector(`.films`);
      const siteFilmListElement = siteFilmBoardElement.querySelector(`.films-list`);
      this._container = siteFilmListElement.querySelector(`.films-list__container`);
      this._board = siteFilmBoardElement;
      this._showmoreBoard = siteFilmListElement;
      this._showingCardsCount = FILM_CARD_AMOUNT_ON_START;
      this._renderCards(cards.slice(0, this._showingCardsCount));

      this.renderLoadMoreButton(cards);
    } else {
      render(this._container, new NoMovies(), RenderPosition.BEFOREEND);
    }
  }

  _removeCards() {
    this._container.innerHTML = ``;
    this._showedCardsControllers = [];
  }

  _renderCards(cards) {
    const newCards = renderCards(this._container, cards, this._movieModel);
    this._showedCardsControllers = this._showedCardsControllers.concat(newCards);
    this._showingCardsCount = this._showedCardsControllers.length;
  }

  renderLoadMoreButton() {
    remove(this._loadMoreButton);

    if (this._showingCardsCount >= this._movieModel.getCards().length) {
      return;
    }

    render(this._showmoreBoard, this._loadMoreButton, RenderPosition.BEFOREEND);
    this._loadMoreButton.setClickHandler(this._onLoadMoreButtonClick);
  }

  _onLoadMoreButtonClick() {
    const prevTasksCount = this._showingCardsCount;
    const cards = this._movieModel.getCards();

    this._showingCardsCount = this._showingCardsCount + FILM_CARD_AMOUNT_BY_BUTTON;

    this._renderCards(cards.slice(prevTasksCount, this._showingCardsCount));

    if (this._showingCardsCount >= cards.length) {
      remove(this._loadMoreButton);
    }
  }

  _onSortTypeChange(sortType) {
    let sortedCards = [];
    const cards = this._movieModel.getCards();
    switch (sortType) {
      case SortType.SORT_BY_DATE:
        sortedCards = cards.slice().sort((a, b) => b.premiere - a.premiere);
        break;
      case SortType.SORT_BY_RATING:
        sortedCards = cards.slice().sort((a, b) => b.rating - a.rating);
        break;
      case SortType.DEFAULT:
        sortedCards = cards.slice(0, this._showingCardsCount);
        break;
    }

    this._container.innerHTML = ``;

    renderCards(this._container, sortedCards, this._movieModel);

    if (sortType === SortType.DEFAULT) {
      this.renderLoadMoreButton();
    } else {
      remove(this._loadMoreButton);
    }
  }

  _onFilterChange() {
    this._removeCards();
    this._renderCards(this._movieModel.getCards().slice(0, FILM_CARD_AMOUNT_ON_START));
    this.renderLoadMoreButton();
  }

  renderTopRatingFilms() {
    const cards = this._movieModel.getCardsAll().slice();
    const topRatingFilms = cards.
    sort((film1, film2) => (film2.rating - film1.rating))
      .filter((film) => film.rating !== 0)
      .slice(0, FILM_CARD_EXTRA_AMOUNT);
    if (topRatingFilms.length > 0) {
      render(this._board, new ExtraFilms(`Top rated`), RenderPosition.BEFOREEND);
      const extraFilmsContainerElement = document.querySelector(`.films-list--extra`);
      const extraFilmsBoardElement = extraFilmsContainerElement.querySelector(`.films-list__container`);
      extraFilmsBoardElement.innerHTML = ``;
      renderCards(extraFilmsBoardElement, topRatingFilms, this._movieModel);
    }
  }

  renderTopCommentsFilms() {
    const cards = this._movieModel.getCardsAll().slice();
    const topCommentsFilms = cards
      .sort((film1, film2) => (film2.comments - film1.comments))
      .filter((film) => film.comments !== 0)
      .slice(0, FILM_CARD_EXTRA_AMOUNT);
    if (topCommentsFilms.length > 0) {
      render(this._board, new ExtraFilms(`MostCommented`), RenderPosition.BEFOREEND);
      const extraFilmsContainerElement = document.querySelectorAll(`.films-list--extra`);
      const extraFilmsBoardElement = extraFilmsContainerElement[1].querySelector(`.films-list__container`);
      extraFilmsBoardElement.innerHTML = ``;
      renderCards(extraFilmsBoardElement, topCommentsFilms, this._movieModel);
    }
  }

  hide() {
    this._cardList.hide();
    this._sortComponent.hide();
  }

  show() {
    this._cardList.show();
    this._sortComponent.show();
  }
}
