import AbstractSmartComponent from "./abstract-smart-component";
import {formatCommentDate} from '../utils/common';
import {Emoji} from "../const";

const setEmotion = (emotion) => {
  let emojiSelected = null;
  switch (emotion) {
    case Emoji.ANGRY:
      emojiSelected = `./images/emoji/angry.png`;
      break;
    case Emoji.PUKE:
      emojiSelected = `./images/emoji/puke.png`;
      break;
    case Emoji.SLEEPING:
      emojiSelected = `./images/emoji/sleeping.png`;
      break;
    case Emoji.SMILE:
      emojiSelected = `./images/emoji/puke.png`;
      break;
  } return emojiSelected;
};

export default class Comment extends AbstractSmartComponent {
  constructor(commentData) {
    super();
    this._commentData = commentData;
  }

  getTemplate() {
    return (`<li class="film-details__comment">
                      <span class="film-details__comment-emoji">
                        <img src="${setEmotion(this._commentData.emotion)}" width="55" height="55" alt="emoji">
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
