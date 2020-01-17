import {getTasksByFilter} from '../utils/filter.js';
import {FilterType} from '../const.js';


export default class Movies {
  constructor() {
    this._filmCards = [];
    this._comments = [];
    this._activeFilterType = FilterType.ALL;
    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  setComments(comments) {
    this._comments = Array.from(comments);
  }

  getComments() {
    return this._comments;
  }

  addComment(newComment) {
    this._comments.unshift(newComment);
  }

  getCards() {
    return getTasksByFilter(this._filmCards, this._activeFilterType);
  }

  getCardsAll() {
    return this._filmCards;
  }

  setCards(cards) {
    this._filmCards = Array.from(cards);
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._filterChangeHandlers.forEach((handler) => handler());
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  updateCard(id, card) {
    const index = this._filmCards.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._filmCards = [].concat(this._filmCards.slice(0, index), card, this._filmCards.slice(index + 1));

    this._dataChangeHandlers.forEach((handler) => handler());

    return true;
  }
}
