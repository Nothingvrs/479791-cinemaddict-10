import AbstractComponent from "./abstract-component";
import {
  getFilmsByFilterStatistic
} from '../utils/filter.js';
import Chart from "chart.js";
import {render, RenderPosition} from '../utils/render';
import StatisticsTextList from "./statistics-text-list";

export const genreCounter = (cards, prop) => {
  let genreCount = 0;
  cards.forEach((card) => {
    card.genre.forEach((genre) => {
      if (genre === prop) {
        genreCount++;
      }
    });
  });
  return genreCount;
};

export default class Statistics extends AbstractComponent {
  constructor(movieModel, activeRadioButton) {
    super();
    this._movieModel = movieModel;
    this._cards = null;
    this._activeStatisticFilterType = null;
    this.setFilterType(activeRadioButton);
    this._watchedFilms = null;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.hide();
    this.setActiveFilter();
  }

  renderStatisticsTextList() {
    this._cards = this._movieModel.getCardsAll();
    this._watchedFilms = getFilmsByFilterStatistic(this._cards, this._activeStatisticFilterType);
    const statisticTextListElement = new StatisticsTextList(this._watchedFilms);
    const statisticForm = this.getElement().querySelector(`form`);
    const statisticTextList = this.getElement().querySelector(`.statistic__text-list`);
    if (statisticTextList !== null) {
      statisticTextList.parentNode.removeChild(statisticTextList);
    }
    render(statisticForm, statisticTextListElement, RenderPosition.AFTERNODE);
  }

  renderChart() {
    const chartWrap = this.getElement().querySelector(`.statistic__chart-wrap`);
    chartWrap.innerHTML = ``;
    chartWrap.innerHTML = `<canvas class="statistic__chart" width="1000"></canvas>`;
    this._cards = this._movieModel.getCardsAll();
    this._watchedFilms = getFilmsByFilterStatistic(this._cards, this._activeStatisticFilterType);
    if (this._watchedFilms.length !== 0) {
      const canvas = this.getElement().querySelector(`.statistic__chart`);
      const ctx = canvas.getContext(`2d`);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return new Chart(ctx, {
        type: `bar`,
        data: {
          labels: [`Romance comedy`, `Horror`, `Documentary`, `Thriller`, `Drama`, `Comedy`],
          datasets: [{
            label: `Favorite Genre`,
            data: [genreCounter(this._watchedFilms, `Romance comedy`),
              genreCounter(this._watchedFilms, `Horror`),
              genreCounter(this._watchedFilms, `Documentary`),
              genreCounter(this._watchedFilms, `Thriller`),
              genreCounter(this._watchedFilms, `Drama`),
              genreCounter(this._watchedFilms, `Comedy`)],
            backgroundColor: `rgba(255, 206, 86, 0.2)`,
            borderColor: `rgba(255, 206, 86, 1)`,
            borderWidth: 2,
          }]
        },
        options: {
          legend: {
            display: false,
            labels: {
              display: false
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
    return 0;
  }

  setFilterType(filterType) {
    this._activeStatisticFilterType = filterType;
  }

  setActiveFilter() {
    [...this.getElement().querySelectorAll(`.statistic__filters-input`)].forEach((button) => {
      if (button.value === this._activeStatisticFilterType) {
        button.checked = `true`;
      }
    });
  }

  getTemplate() {
    return `<section class="statistic visually-hidden">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">Sci-Figther</span>
    </p>
    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all">
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
      <label for="statistic-today" class="statistic__filters-label">Today</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
      <label for="statistic-week" class="statistic__filters-label">Week</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
      <label for="statistic-month" class="statistic__filters-label">Month</label>
      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>
    
    <div class="statistic__chart-wrap">
     <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
  }
}


