import Search from './components/search';
import FilterController from './controllers/filter';
import Profile from './components/profile';
import Movies from './models/movies.js';
import Statistics from './components/statistics';
import {generateFimCards} from './mocks/film-card';
import {render, RenderPosition} from './utils/render';
import BoardController from "./controllers/board";
import {generateComments} from "./mocks/comments";
import {FilterTypeStatistic} from "./const";

let isStatsViewing = false;

const showStatisticHandler = (boardControllerElement, statisticsElement) => {
  return (evt) => {
    if (evt.target.className.includes(`main-navigation__item--additional`)) {
      if (!isStatsViewing) {
        isStatsViewing = true;
        boardControllerElement.hide();
        statisticsElement.show();
        statisticsElement.renderStatisticsTextList();
        statisticsElement.updateChartData();
      }
    } else {
      boardControllerElement.show();
      statisticsElement.hide();
      isStatsViewing = false;
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

render(siteHeaderElement, new Search(), RenderPosition.BEFOREEND);
const profileElement = new Profile(movieModel);
render(siteHeaderElement, profileElement, RenderPosition.BEFOREEND);

const boardControllerElement = new BoardController(movieModel);

const statisticsElement = new Statistics(movieModel, FilterTypeStatistic.ALL);
const filterController = new FilterController(siteMainElement, movieModel, showStatisticHandler(boardControllerElement, statisticsElement));
filterController.render();

boardControllerElement.renderFilmCards(movieModel);
render(siteMainElement, statisticsElement, RenderPosition.BEFOREEND);

boardControllerElement.renderTopRatingFilms();

boardControllerElement.renderTopCommentsFilms();


