import Search from './components/search';
import FilterController from './controllers/filter';
import Profile from './components/profile';
import Movies from './models/movies.js';
import Statistics from './components/statistics';
import {generateFimCards} from './mocks/film-card';
import {render, RenderPosition} from './utils/render';
import BoardController from "./controllers/board";
import {generateComments} from "./mocks/comments";

const showStatisticHandler = (boardControllerElement, statisticsElement) => {
  return (evt) => {
    if (evt.target.className.includes(`main-navigation__item--additional`)) {
      boardControllerElement.hide();
      statisticsElement.show();
    } else {
      boardControllerElement.show();
      statisticsElement.hide();
    }
  };
};

const FILM_CARD_COUNT = 12;
const filmCards = generateFimCards(FILM_CARD_COUNT);
const comments = generateComments(4);
const movieModel = new Movies();
movieModel.setCards(filmCards);
movieModel.setComments(comments);
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

const boardControllerElement = new BoardController(movieModel);
const statisticsElement = new Statistics();

render(siteHeaderElement, new Search(), RenderPosition.BEFOREEND);
render(siteHeaderElement, new Profile(), RenderPosition.BEFOREEND);
const filterController = new FilterController(siteMainElement, movieModel, showStatisticHandler(boardControllerElement, statisticsElement));
filterController.render();

boardControllerElement.renderFilmCards(movieModel);
render(siteMainElement, statisticsElement, RenderPosition.BEFOREEND);

boardControllerElement.renderTopRatingFilms();

boardControllerElement.renderTopCommentsFilms();


