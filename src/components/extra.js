import {createFilmCardElement} from "./card";

const createFilmsListMarkup = (cards) => (
  cards.map((card) => (createFilmCardElement(card))).join(``)
);

export const createExtraFilmsTemplate = (title, films) => (
  `<section class="films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
      ${createFilmsListMarkup(films)}
    </div>
  </section>`);
