import {createSearchElement} from './components/search.js';
import {createButtonShowMoreElement} from './components/button-show-more.js';
import {createFilmCardElement} from './components/card.js';
import {createFilmCardsListElement} from './components/film-card-list.js';
import {createMenuElement} from './components/menu.js';
import {createFilmDetailsPopupElement} from './components/popup-details.js';
import {createProfileRatingElement} from './components/profile.js';
import {createExtraFilmsTemplate} from "./components/extra";
import {createSortElement} from './components/sorting.js';
import {generateFimCards} from "./mocks/film-card";

const FILM_CARD_AMOUNT_BY_BUTTON = 5;
const FILM_CARD_AMOUNT_ON_START = 5;
const FILM_CARD_EXTRA_AMOUNT = 2;
const FILM_CARD_COUNT = 12;

const filmCards = generateFimCards(FILM_CARD_COUNT);

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createSearchElement());
render(siteHeaderElement, createProfileRatingElement());

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMenuElement(filmCards));
render(siteMainElement, createSortElement());
render(siteMainElement, createFilmCardsListElement());

const siteFilmListElement = siteMainElement.querySelector(`.films-list`);
const siteFilmsListContainerElement = siteFilmListElement.querySelector(`.films-list__container`);
const siteFilmBoardElement = document.querySelector(`.films`);

render(siteFilmsListContainerElement, createFilmCardElement(filmCards[0]), `beforeend`);
let showingCardsCount = FILM_CARD_AMOUNT_ON_START;
filmCards.slice(1, showingCardsCount).forEach((card) => render(siteFilmsListContainerElement, createFilmCardElement(card), `beforeend`));

render(siteFilmListElement, createButtonShowMoreElement());

const loadMoreButton = siteFilmListElement.querySelector(`.films-list__show-more`);
loadMoreButton.addEventListener(`click`, () => {
  const prevCardsCount = showingCardsCount;
  showingCardsCount = showingCardsCount + FILM_CARD_AMOUNT_BY_BUTTON;

  filmCards.slice(prevCardsCount, showingCardsCount)
    .forEach((card) => render(siteFilmsListContainerElement, createFilmCardElement(card), `beforeend`));

  if (showingCardsCount >= filmCards.length) {
    loadMoreButton.remove();
  }
});

const topRatingFilms = filmCards
  .sort((film1, film2) => (film2.rating - film1.rating))
  .filter((film) => film.rating !== 0)
  .slice(0, FILM_CARD_EXTRA_AMOUNT);
if (topRatingFilms.length > 0) {
  render(siteFilmBoardElement, createExtraFilmsTemplate(`Top rated`, topRatingFilms));
}

const topCommentsFilms = filmCards
  .sort((film1, film2) => (film2.comments.length - film1.comments.length))
  .filter((film) => film.comments.length !== 0)
  .slice(0, FILM_CARD_EXTRA_AMOUNT);

if (topRatingFilms.length > 0) {
  render(siteFilmBoardElement, createExtraFilmsTemplate(`Most commented`, topCommentsFilms));
}

render(siteMainElement, createFilmDetailsPopupElement(filmCards[0]));
