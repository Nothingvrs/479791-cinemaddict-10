import AbstractComponent from '../components/abstract-component';
import Comment from '../components/comment';
import Comments from '../components/comments';
import {render, RenderPosition} from '../utils/render';
import {getRandomArrayElement} from "../utils/common";
import he from 'he';

const authorComment = [
  `Tim Macoveev`,
  `John Doe`,
  `Jerry Black`,
  `Aaron Mac Calister`
];

export default class CommentsController extends AbstractComponent {
  constructor(form, movieModel) {
    super();
    this._form = form;
    this._movieModel = movieModel;
    this._commentsData = this._movieModel.getComments();
    this._commentsList = null;
    this._getData = this._getData.bind(this);
  }

  _renderComments() {
    this._comments = new Comments(this._commentsData.length);
    this._commentsList = this._comments.getElement().querySelector(`.film-details__comments-list`);
    render(this._form, this._comments, RenderPosition.BEFOREEND);

    this._commentsData.forEach((comment) => {
      const commentElement = new Comment(comment);
      render(this._commentsList, commentElement, RenderPosition.BEFOREEND);

      commentElement.onRemoveClick(() => {
        const index = this._commentsData.indexOf(comment);
        this._commentsData.splice(index, 1);
        this._comments.remove();
        this._renderComments();
      });
    });
  }

  _getData() {
    const formData = new FormData(this._form);

    return this._parseFormData(formData);
  }

  _parseFormData(formData) {
    const emojiChecked = formData.get(`comment-emoji`);
    const label = document.querySelector(`[for="emoji-${emojiChecked}"]`);
    const selectedEmoji = label.querySelector(`img`).src;

    return {
      author: getRandomArrayElement(authorComment),
      text: he.encode(formData.get(`comment`)),
      emoji: selectedEmoji,
      date: new Date(),
    };
  }

  onCommentAdd() {
    this._movieModel.addComment(this._getData());
    this._comments.remove();
    this._renderComments();
  }
}
