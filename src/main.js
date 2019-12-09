import Search from './components/search';
import LoadMoreButton from './components/button-show-more';
import FilmCard from './components/card';
import FilmCardList from './components/film-card-list';
import Menu from './components/menu';
import Profile from './components/profile';
import ExtraFilms from './components/extra';
import Sort from './components/sorting';
import PopupDetails from './components/popup-details';
import NoMovies from './components/no-movies';
import {generateFimCards} from './mocks/film-card';
import {render, RenderPosition} from './utils';

const FILM_CARD_AMOUNT_BY_BUTTON = 5;
const FILM_CARD_AMOUNT_ON_START = 5;
const FILM_CARD_EXTRA_AMOUNT = 2;
const FILM_CARD_COUNT = 12;

const filmCards = generateFimCards(FILM_CARD_COUNT);

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new Search().getElement(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new Profile().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new Menu(filmCards).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Sort().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmCardList().getElement(), RenderPosition.BEFOREEND);

const siteFilmListElement = siteMainElement.querySelector(`.films-list`);
const siteFilmsListContainerElement = siteFilmListElement.querySelector(`.films-list__container`);
const siteFilmBoardElement = document.querySelector(`.films`);

const renderFilmCard = (cardListElement, card) => {
  const popupElement = new PopupDetails(card);
  const closePopup = popupElement.getElement().querySelector(`.film-details__close-btn`);
  const filmCardElement = new FilmCard(card, closePopup, siteMainElement);
  const openCard = filmCardElement.getElement().querySelector(`img`);
  const openTitle = filmCardElement.getElement().querySelector(`.film-card__title`);
  const openComments = filmCardElement.getElement().querySelector(`.film-card__comments`);

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      filmCardElement.closePopup(popupElement);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardElement.getOpen(openCard, popupElement, onEscKeyDown);
  filmCardElement.getOpen(openTitle, popupElement, onEscKeyDown);
  filmCardElement.getOpen(openComments, popupElement, onEscKeyDown);
  filmCardElement.getClose(popupElement, onEscKeyDown);

  render(cardListElement, filmCardElement.getElement(), RenderPosition.BEFOREEND);
};

if (filmCards.length) {
  renderFilmCard(siteFilmsListContainerElement, filmCards[0]);
  let showingCardsCount = FILM_CARD_AMOUNT_ON_START;
  filmCards.slice(1, showingCardsCount).forEach((card) => renderFilmCard(siteFilmsListContainerElement, card));

  render(siteFilmListElement, new LoadMoreButton().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = siteFilmListElement.querySelector(`.films-list__show-more`);
  loadMoreButton.addEventListener(`click`, () => {
    const prevCardsCount = showingCardsCount;
    showingCardsCount = showingCardsCount + FILM_CARD_AMOUNT_BY_BUTTON;

    filmCards.slice(prevCardsCount, showingCardsCount)
      .forEach((card) => renderFilmCard(siteFilmsListContainerElement, card));

    if (showingCardsCount >= filmCards.length) {
      loadMoreButton.remove();
    }
  });
} else {
  render(siteFilmsListContainerElement, new NoMovies().getElement(), RenderPosition.BEFOREEND);
}

const topRatingFilms = filmCards
  .sort((film1, film2) => (film2.rating - film1.rating))
  .filter((film) => film.rating !== 0)
  .slice(0, FILM_CARD_EXTRA_AMOUNT);
if (topRatingFilms.length > 0) {
  render(siteFilmBoardElement, new ExtraFilms(`Top rated`).getElement(), RenderPosition.BEFOREEND);
  const extraFilmsContainerElement = siteFilmBoardElement.querySelector(`.films-list--extra`);
  const extraFilmsBoardElement = extraFilmsContainerElement.querySelector(`.films-list__container`);
  topRatingFilms.map((film) => (renderFilmCard(extraFilmsBoardElement, film)));
}

const topCommentsFilms = filmCards
  .sort((film1, film2) => (film2.comments - film1.comments))
  .filter((film) => film.comments !== 0)
  .slice(0, FILM_CARD_EXTRA_AMOUNT);
if (topCommentsFilms.length > 0) {
  render(siteFilmBoardElement, new ExtraFilms(`MostCommented`).getElement(), RenderPosition.BEFOREEND);
  const extraFilmsContainerElement = siteFilmBoardElement.querySelectorAll(`.films-list--extra`);
  const extraFilmsBoardElement = extraFilmsContainerElement[1].querySelector(`.films-list__container`);
  topCommentsFilms.map((film) => (renderFilmCard(extraFilmsBoardElement, film)));
}

