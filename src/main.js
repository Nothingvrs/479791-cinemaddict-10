
import {createSearchElement} from './components/search.js';
import {createButtonShowMoreElement} from './components/button-show-more.js';
import {createFilmCardElement} from './components/card.js';
import {createFilmCardsListElement} from './components/film-card-list.js';
import {createMenuElement} from './components/menu.js';
import {createFilmDetailsPopupElement} from './components/popup-details.js';
import {createProfileRatingElement} from './components/profile.js';
import {createSortElement} from './components/sorting.js';

const FILM_CARD_AMOUNT = 5;
const FILM_CARD_EXTRA_AMOUNT = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createSearchElement());
render(siteHeaderElement, createProfileRatingElement());

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMenuElement());
render(siteMainElement, createSortElement());
render(siteMainElement, createFilmCardsListElement());

const siteFilmListElement = siteMainElement.querySelector(`.films-list`);
const siteFilmListTopRatedElement = siteMainElement.querySelector(`.top_rated`);
const siteFilmListMostCommentedElement = siteMainElement.querySelector(`.most_commented`);
const siteFilmsListContainerElement = siteFilmListElement.querySelector(`.films-list__container`);
const siteFilmsTopRatedListContainerElement = siteFilmListTopRatedElement.querySelector(`.films-list__container`);
const siteFilmsMostCommentedListContainerElement = siteFilmListMostCommentedElement.querySelector(`.films-list__container`);

new Array(FILM_CARD_AMOUNT)
  .fill(``)
  .forEach(
      () => render(siteFilmsListContainerElement, createFilmCardElement())
  );

new Array(FILM_CARD_EXTRA_AMOUNT)
  .fill(``)
  .forEach(
      () => render(siteFilmsTopRatedListContainerElement, createFilmCardElement())
  );

new Array(FILM_CARD_EXTRA_AMOUNT)
  .fill(``)
  .forEach(
      () => render(siteFilmsMostCommentedListContainerElement, createFilmCardElement())
  );

render(siteFilmListElement, createButtonShowMoreElement());
render(siteMainElement, createFilmDetailsPopupElement());
