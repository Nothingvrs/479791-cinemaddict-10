import Search from './components/search';
import Menu from './components/menu';
import Profile from './components/profile';
import {generateFimCards} from './mocks/film-card';
import {render, RenderPosition} from './utils/render';
import BoardController from "./controllers/board";

const FILM_CARD_COUNT = 12;

const filmCards = generateFimCards(FILM_CARD_COUNT);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new Search(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
render(siteMainElement, new Menu(filmCards), RenderPosition.BEFOREEND);

const boardController = new BoardController();
boardController.renderFilmCards(filmCards);

boardController.renderTopRatingFilms(filmCards);

boardController.renderTopCommentsFilms(filmCards);


