import AbstractComponent from './abstract-component';

export default class Profile extends AbstractComponent {
  constructor(movieModel) {
    super();
    this._movieModel = movieModel;
    this._cards = this._movieModel.getCardsAll();
    this._filmsWatched = this._cards.filter((card) => {
      return card.isWatched === true;
    });
    this._noviceCount = 10;
    this._fanCount = 20;
  }

  getTemplate() {
    return (`<section class="header__profile profile">
                <p class="profile__rating">${this.generateRating()}</p>
                <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
           </section>`);
  }

  generateRating() {
    let rating;
    if (this._filmsWatched.length <= this._noviceCount) {
      rating = `novice`;
    } else if (this._filmsWatched.length > this._noviceCount && this._filmsWatched.length <= this._fanCount) {
      rating = `fan`;
    } else if (this._filmsWatched.length > this._fanCount) {
      rating = `movie buff`;
    } return rating;
  }
}
