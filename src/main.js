import Search from './components/search';
import FilterController from './controllers/filter';
import Profile from './components/profile';
import Movies from './models/movies.js';
import Statistics from './components/statistics';
import {render, RenderPosition} from './utils/render';
import BoardController from "./controllers/board";
import {FilterTypeStatistic} from "./const";
import API from './api.js';

const AUTHORIZATION = `Basic dXNlckBwYXNzd29yZAo=`;
const END_POINT = `https://htmlacademy-es-10.appspot.com/cinemaddict`;

let isStatsViewing = false;

const showStatisticHandler = (boardControllerElement, statisticsElement) => {
  return (evt) => {
    if (evt.target.className.includes(`main-navigation__item--additional`) && !isStatsViewing) {
      isStatsViewing = true;
      boardControllerElement.hide();
      statisticsElement.show();
      statisticsElement.renderStatisticsTextList();
      statisticsElement.updateChartData();
    } else {
      boardControllerElement.show();
      statisticsElement.hide();
      isStatsViewing = false;
    }
  };
};

const api = new API(END_POINT, AUTHORIZATION);
const movieModel = new Movies();


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, new Search(), RenderPosition.BEFOREEND);
const profileElement = new Profile(movieModel);
render(siteHeaderElement, profileElement, RenderPosition.BEFOREEND);

const boardControllerElement = new BoardController(movieModel, api);

const statisticsElement = new Statistics(movieModel, FilterTypeStatistic.ALL);
const filterController = new FilterController(siteMainElement, movieModel, showStatisticHandler(boardControllerElement, statisticsElement));
filterController.render();

render(siteMainElement, statisticsElement, RenderPosition.BEFOREEND);

api.getMovies()
  .then((movies) => {

    const commentsPromises = movies.map((movie) => {
      return api.getComments(movie.id).then((comments) => {
        movie.comments = comments;
      });
    });

    Promise.all(commentsPromises).then(() => {
      movieModel.setCards(movies);

      boardControllerElement.renderFilmCards();
      boardControllerElement.renderTopRatingFilms();
      boardControllerElement.renderTopCommentsFilms();
    });
  });
