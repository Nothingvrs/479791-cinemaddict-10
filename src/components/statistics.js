import AbstractComponent from "./abstract-component";
import {
  getFilmsByFilterStatistic
} from '../utils/filter.js';
import Chart from "chart.js";
import {render, RenderPosition} from '../utils/render';
import StatisticsTextList from './statistics-text-list';

export const genreCounter = (cards, prop) => {
  let genreCount = 0;
  cards.forEach((card) => {
    card.filmInfo.genres.forEach((genre) => {
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
    this._chart = null;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.renderStatisticsTextList = this.renderStatisticsTextList.bind(this);
    this.updateChartData = this.updateChartData.bind(this);
    this._onFilterClick = this._onFilterClick.bind(this);
    this.hide();
    this.setActiveFilter();
    this.renderChart();
  }

  renderStatisticsTextList() {
    this._cards = this._movieModel.getCardsAll();
    this._watchedFilms = getFilmsByFilterStatistic(this._cards, this._activeStatisticFilterType);
    const statisticTextListElement = new StatisticsTextList(this._watchedFilms);
    const statisticForm = this.getElement().querySelector(`form`);
    const statisticTextList = this.getElement().querySelector(`.statistic__text-list`);
    if (statisticTextList) {
      statisticTextList.parentNode.removeChild(statisticTextList);
    }
    render(statisticForm, statisticTextListElement, RenderPosition.AFTERNODE);
  }

  renderChart() {
    this._cards = this._movieModel.getCardsAll();
    this._watchedFilms = getFilmsByFilterStatistic(this._cards, this._activeStatisticFilterType);
    if (this._watchedFilms.length !== 0) {
      const canvas = this.getElement().querySelector(`.statistic__chart`);
      const ctx = canvas.getContext(`2d`);
      this._chart = new Chart(ctx, {
        type: `bar`,
        data: {
          labels: [`Adventure`, `Horror`, `Action`, `Thriller`, `Drama`, `Comedy`, `Family`, `Sci-Fi`, `Animation`],
          datasets: [{
            data: [genreCounter(this._watchedFilms, `Adventure`),
              genreCounter(this._watchedFilms, `Horror`),
              genreCounter(this._watchedFilms, `Action`),
              genreCounter(this._watchedFilms, `Thriller`),
              genreCounter(this._watchedFilms, `Drama`),
              genreCounter(this._watchedFilms, `Comedy`),
              genreCounter(this._watchedFilms, `Family`),
              genreCounter(this._watchedFilms, `Sci-Fi`),
              genreCounter(this._watchedFilms, `Animation`)],
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
      return this._chart;
    }
    return 0;
  }

  updateChartData() {
    this._chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    this._chart.data.datasets = [{
      data: [genreCounter(this._watchedFilms, `Adventure`),
        genreCounter(this._watchedFilms, `Horror`),
        genreCounter(this._watchedFilms, `Action`),
        genreCounter(this._watchedFilms, `Thriller`),
        genreCounter(this._watchedFilms, `Drama`),
        genreCounter(this._watchedFilms, `Comedy`),
        genreCounter(this._watchedFilms, `Family`),
        genreCounter(this._watchedFilms, `Sci-Fi`),
        genreCounter(this._watchedFilms, `Animation`)],
      backgroundColor: `rgba(255, 206, 86, 0.2)`,
      borderColor: `rgba(255, 206, 86, 1)`,
      borderWidth: 2,
    }];
    this._chart.update();
  }

  setFilterType(filterType) {
    this._activeStatisticFilterType = filterType;
  }

  setActiveFilter() {
    this.getElement().querySelector(`.statistic__filters-input[value=${this._activeStatisticFilterType}]`).checked = true;
  }

  setFilterByPeriod() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, this._onFilterClick);
  }

  removeFilterByPeriod() {
    this.getElement().querySelector(`.statistic__filters`).removeEventListener(`change`, this._onFilterClick);
  }

  _onFilterClick(evt) {
    evt.target.checked = true;
    this._activeStatisticFilterType = evt.target.value;
    this.renderStatisticsTextList();
    this.updateChartData();
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


