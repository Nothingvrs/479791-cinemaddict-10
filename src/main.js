import Search from './components/search';
import FilterController from './controllers/filter';
import Profile from './components/profile';
import Movies from './models/movies.js';
import {generateFimCards} from './mocks/film-card';
import {render, RenderPosition} from './utils/render';
import BoardController from "./controllers/board";

const FILM_CARD_COUNT = 12;

const filmCards = generateFimCards(FILM_CARD_COUNT);
const movieModel = new Movies();
movieModel.setCards(filmCards);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new Search(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
const filterController = new FilterController(siteMainElement, movieModel);
filterController.render();

const boardController = new BoardController(movieModel);
boardController.renderFilmCards(movieModel);

boardController.renderTopRatingFilms();

boardController.renderTopCommentsFilms();


