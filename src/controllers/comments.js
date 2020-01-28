import AbstractComponent from '../components/abstract-component';
import Comment from '../components/comment';
import Comments from '../components/comments';
import MovieComment from '../models/comment';
import {render, RenderPosition} from '../utils/render';
import he from 'he';

export default class CommentsController extends AbstractComponent {
  constructor(card, form, id, api) {
    super();
    this._api = api;
    this._form = form;
    this._card = card;
    this._api.getComments(id)
      .then((comments) => {
        this._card.comments = comments;
      });
    this._commentsData = this._card.comments;
    this._commentsList = null;
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

  onCommentAdd() {
    const emojiChecked = new FormData(this._form).get(`comment-emoji`);
    const label = document.querySelector(`[for="emoji-${emojiChecked}"]`);
    const selectedEmoji = label.querySelector(`img`).src;
    const commentText = this._form.querySelector(`.film-details__comment-input`);

    if (selectedEmoji && commentText.value) {
      this._form.disabled = true;

      const newComment = new MovieComment({
        'comment': he.encode(commentText.value),
        'date': new Date(),
        'emotion': selectedEmoji,
      });

      this._api.getComments()
        .then((comments) => {
          comments.unshift(this._api.createComment(newComment, this._card.id));
        });
      this._comments.remove();
      this._renderComments();
    }
  }
}

