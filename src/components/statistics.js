import AbstractComponent from "./abstract-component";
import {
  getFilmsByFilterStatistic
} from '../utils/filter.js';
import Chart from "chart.js";

const genreCounter = (cards, prop) => {
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
  constructor(cards, activeRadioButton) {
    super();
    this._cards = cards;
    this._activeStatisticFilterType = null;
    this.setFilterType(activeRadioButton);
    this._watchedFilms = getFilmsByFilterStatistic(this._cards, this._activeStatisticFilterType);
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.hide();
    this.renderChart();
    this.setActiveFilter();
  }

  renderChart() {
    if (this._watchedFilms.length !== 0) {
      const ctx = this.getElement().querySelector(`.statistic__chart`).getContext(`2d`);
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
            backgroundColor: [
              `rgba(255, 99, 132, 0.2)`,
              `rgba(255, 206, 86, 0.2)`,
              `rgba(255, 206, 86, 0.2)`,
              `rgba(255, 206, 86, 0.2)`,
              `rgba(255, 206, 86, 0.2)`,
              `rgba(255, 206, 86, 0.2)`,
            ],
            borderColor: [
              `rgba(255, 99, 132, 1)`,
              `rgba(255, 206, 86, 1)`,
              `rgba(255, 206, 86, 1)`,
              `rgba(255, 206, 86, 1)`,
              `rgba(255, 206, 86, 1)`,
              `rgba(255, 206, 86, 1)`,
            ],
            borderWidth: 2,
          }]
        },
        options: {
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
    const totalFilms = this._watchedFilms.length;
    let amountDuration = 0;
    this._watchedFilms.forEach((card) => {
      amountDuration += card.duration;
    });

    const fractionalPart = Math.trunc(amountDuration / 60);

    const amountTime = {
      hours: fractionalPart,
      minutes: amountDuration - (fractionalPart * 60),
    };

    const getMostPopularGenre = () => {
      const genres = {
        RomanceComedy: genreCounter(this._watchedFilms, `Romance comedy`),
        Horror: genreCounter(this._watchedFilms, `Horror`),
        Documentary: genreCounter(this._watchedFilms, `Documentary`),
        Thriller: genreCounter(this._watchedFilms, `Thriller`),
        Drama: genreCounter(this._watchedFilms, `Drama`),
        Comedy: genreCounter(this._watchedFilms, `Comedy`)
      };
      const sortedGenres = Object.entries(genres).sort((a, b) => b[1] - a[1]);
      return sortedGenres[0];
    };

    const mostPopularGenre = getMostPopularGenre();

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
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text statistic__item-text_watched-movies">${totalFilms} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${amountTime.hours} <span class="statistic__item-description">h</span> ${amountTime.minutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${this._watchedFilms.length === 0 ? `—` : mostPopularGenre[0]}</p>
      </li>
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
  }
}


