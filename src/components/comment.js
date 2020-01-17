import AbstractSmartComponent from "./abstract-smart-component";
import {formatCommentDate} from '../utils/common';

export default class Comment extends AbstractSmartComponent {
  constructor(commentData) {
    super();
    this._commentData = commentData;
  }

  getTemplate() {
    return (`<li class="film-details__comment">
                      <span class="film-details__comment-emoji">
                        <img src="${this._commentData.emoji}" width="55" height="55" alt="emoji">
                      </span>
                      <div>
                        <p class="film-details__comment-text">${this._commentData.text}</p>
                        <p class="film-details__comment-info">
                          <span class="film-details__comment-author">${this._commentData.author}</span>
                          <span class="film-details__comment-day">${formatCommentDate(this._commentData.date)}</span>
                          <button class="film-details__comment-delete">Delete</button>
                        </p>
                      </div>
                    </li>`);
  }

  onRemoveClick(handler) {
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, handler);
  }
}

