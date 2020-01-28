import AbstractComponent from "./abstract-component";
import {genreCounter} from './statistics';

export default class StatisticsTextList extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    this._watchedFilms = this._cards;
    const totalFilms = this._watchedFilms.length;
    let amountDuration = 0;
    this._watchedFilms.forEach((card) => {
      amountDuration += card.filmInfo.duration;
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

    return `<ul class="statistic__text-list">
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
    </ul>`;
  }
}
