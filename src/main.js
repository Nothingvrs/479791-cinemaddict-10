import Search from "./components/search";
import LoadMoreButton from "./components/button-show-more";
import FilmCard from "./components/card";
import FilmCardList from "./components/film-card-list";
import Menu from "./components/menu";
//import PopupDetails from "./components/popup-details";
import Profile from "./components/profile";
import ExtraFilms from "./components/extra";
import Sort from "./components/sorting";
import {generateFimCards} from "./mocks/film-card";
import {render, RenderPosition} from "./utils";

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

render(siteFilmsListContainerElement, new FilmCard(filmCards[0]).getElement(), RenderPosition.BEFOREEND);
let showingCardsCount = FILM_CARD_AMOUNT_ON_START;
filmCards.slice(1, showingCardsCount).forEach((card) => render(siteFilmsListContainerElement, new FilmCard(card).getElement(), `beforeend`));

render(siteFilmListElement, new LoadMoreButton().getElement(), RenderPosition.BEFOREEND);

const loadMoreButton = siteFilmListElement.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevCardsCount = showingCardsCount;
  showingCardsCount = showingCardsCount + FILM_CARD_AMOUNT_BY_BUTTON;

  filmCards.slice(prevCardsCount, showingCardsCount)
    .forEach((card) => render(siteFilmsListContainerElement, new FilmCard(card).getElement(), RenderPosition.BEFOREEND));

  if (showingCardsCount >= filmCards.length) {
    loadMoreButton.remove();
  }
});

const topRatingFilms = filmCards
  .sort((film1, film2) => (film2.rating - film1.rating))
  .filter((film) => film.rating !== 0)
  .slice(0, FILM_CARD_EXTRA_AMOUNT);
if (topRatingFilms.length > 0) {
  const createFilmsListMarkup = topRatingFilms.map((film) => (new FilmCard(film).getElement())).join(``);
  render(siteFilmBoardElement, new ExtraFilms(`Top rated`, createFilmsListMarkup).getElement());
}

const topCommentsFilms = filmCards
  .sort((film1, film2) => (film2.comments - film1.comments))
  .filter((film) => film.comments !== 0)
  .slice(0, FILM_CARD_EXTRA_AMOUNT);

if (topCommentsFilms.length > 0) {
  const createFilmsListMarkup = topCommentsFilms.map((film) => (new FilmCard(film).getElement())).join(``);
  render(siteFilmBoardElement, new ExtraFilms(`Most commented`, createFilmsListMarkup).getElement());
}

