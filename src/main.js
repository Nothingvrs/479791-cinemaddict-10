import Search from './components/search';
import FilmCardList from './components/film-card-list';
import Menu from './components/menu';
import Profile from './components/profile';
import Sort from './components/sorting';
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
render(siteMainElement, new Sort(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmCardList(), RenderPosition.BEFOREEND);

const siteFilmBoardElement = siteMainElement.querySelector(`.films`);
const siteFilmListElement = siteFilmBoardElement.querySelector(`.films-list`);
const siteFilmListContainer = siteFilmListElement.querySelector(`.films-list__container`);

const boardController = new BoardController(siteFilmListContainer, siteFilmBoardElement, siteFilmListElement);
boardController.renderFilmCards(filmCards, siteFilmListElement);

boardController.renderTopRatingFilms(filmCards);

boardController.renderTopCommentsFilms(filmCards);


